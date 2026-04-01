"""
仪表盘 API 路由
P0-002: 添加多租户数据隔离
"""

import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.permissions import get_tenant_user  # P0-002: 租户隔离
from app.models.carbon import CarbonEmission, EmissionScope
from app.models.energy import EnergyData, EnergyType
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["仪表盘"])


@router.get("/summary")
async def get_dashboard_summary(
    organization_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_tenant_user)  # P0-002: 需要租户用户
):
    """获取仪表盘核心指标"""
    now = datetime.now(timezone.utc)
    this_month_start = datetime(now.year, now.month, 1)
    last_month_start = (this_month_start - timedelta(days=1)).replace(day=1)
    
    # P0-002: 所有查询都添加租户过滤
    tenant_id = current_user.tenant_id
    
    # 1. 本月总排放
    query_emission = select(func.sum(CarbonEmission.emission_amount)).where(
        CarbonEmission.organization_id == organization_id,
        CarbonEmission.tenant_id == tenant_id,  # P0-002: 租户隔离
        CarbonEmission.calculation_date >= this_month_start
    )
    total_emission = (await db.execute(query_emission)).scalar() or 0
    
    # 2. 上月排放（用于环比）
    query_last_emission = select(func.sum(CarbonEmission.emission_amount)).where(
        CarbonEmission.organization_id == organization_id,
        CarbonEmission.tenant_id == tenant_id,  # P0-002: 租户隔离
        CarbonEmission.calculation_date >= last_month_start,
        CarbonEmission.calculation_date < this_month_start
    )
    last_emission = (await db.execute(query_last_emission)).scalar() or 0
    emission_trend = ((total_emission - last_emission) / last_emission * 100) if last_emission > 0 else 0
    
    # 3. 本月能耗费用
    query_cost = select(func.sum(EnergyData.cost)).where(
        EnergyData.organization_id == organization_id,
        EnergyData.tenant_id == tenant_id,  # P0-002: 租户隔离
        EnergyData.data_date >= this_month_start.date()
    )
    total_cost = (await db.execute(query_cost)).scalar() or 0
    
    # 4. 年度目标完成度 (模拟目标: 5000t)
    yearly_target = 5000
    query_year_emission = select(func.sum(CarbonEmission.emission_amount)).where(
        CarbonEmission.organization_id == organization_id,
        CarbonEmission.tenant_id == tenant_id,  # P0-002: 租户隔离
        CarbonEmission.calculation_date >= datetime(now.year, 1, 1)
    )
    current_year_emission = (await db.execute(query_year_emission)).scalar() or 0
    progress = min(round((current_year_emission / yearly_target) * 100, 1), 100)
    
    return {
        "total_emission": round(total_emission, 2),
        "emission_trend": round(emission_trend, 1),
        "total_cost": round(total_cost, 2),
        "year_progress": progress,
        "year_target": yearly_target,
        "current_year_emission": round(current_year_emission, 2)
    }


@router.get("/trends")
async def get_dashboard_trends(
    organization_id: uuid.UUID,
    period: str = Query("month", description="周期: month/year"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_tenant_user)  # P0-002: 需要租户用户
):
    """获取排放趋势图表数据"""
    now = datetime.now(timezone.utc)
    data = []
    tenant_id = current_user.tenant_id  # P0-002: 获取租户 ID
    
    if period == "year":
        start_date = now - timedelta(days=365)
        # 单次查询：按月聚合
        query = select(
            func.extract('month', CarbonEmission.calculation_date).label('month'),
            func.extract('year', CarbonEmission.calculation_date).label('year'),
            func.sum(CarbonEmission.emission_amount).label('total')
        ).where(
            CarbonEmission.organization_id == organization_id,
            CarbonEmission.tenant_id == tenant_id,
            CarbonEmission.calculation_date >= start_date
        ).group_by(
            func.extract('year', CarbonEmission.calculation_date),
            func.extract('month', CarbonEmission.calculation_date)
        )
        result = await db.execute(query)
        # 构建 (year, month) -> value 映射
        monthly = {(int(r.year), int(r.month)): round(r.total or 0, 2) for r in result}
        # 生成最近12个月的数据点
        for i in range(11, -1, -1):
            date_point = now - timedelta(days=i * 30)
            key = (date_point.year, date_point.month)
            data.append({"name": f"{date_point.month}月", "value": monthly.get(key, 0)})
    else:
        start_date = now - timedelta(days=30)
        # 单次查询：按天聚合
        query = select(
            func.extract('day', CarbonEmission.calculation_date).label('day'),
            func.extract('month', CarbonEmission.calculation_date).label('month'),
            func.extract('year', CarbonEmission.calculation_date).label('year'),
            func.sum(CarbonEmission.emission_amount).label('total')
        ).where(
            CarbonEmission.organization_id == organization_id,
            CarbonEmission.tenant_id == tenant_id,
            CarbonEmission.calculation_date >= start_date
        ).group_by(
            func.extract('year', CarbonEmission.calculation_date),
            func.extract('month', CarbonEmission.calculation_date),
            func.extract('day', CarbonEmission.calculation_date)
        )
        result = await db.execute(query)
        # 构建 (year, month, day) -> value 映射
        daily = {(int(r.year), int(r.month), int(r.day)): round(r.total or 0, 2) for r in result}
        # 生成最近30天的数据点
        for i in range(29, -1, -1):
            date_point = now - timedelta(days=i)
            key = (date_point.year, date_point.month, date_point.day)
            data.append({"name": f"{date_point.day}日", "value": daily.get(key, 0)})
        
    return data


@router.get("/distribution")
async def get_emission_distribution(
    organization_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_tenant_user)  # P0-002: 需要租户用户
):
    """获取排放构成（按范围）"""
    now = datetime.now(timezone.utc)
    start_year = datetime(now.year, 1, 1)
    tenant_id = current_user.tenant_id  # P0-002: 获取租户 ID
    
    query = select(
        CarbonEmission.scope,
        func.sum(CarbonEmission.emission_amount)
    ).where(
        CarbonEmission.organization_id == organization_id,
        CarbonEmission.tenant_id == tenant_id,  # P0-002: 租户隔离
        CarbonEmission.calculation_date >= start_year
    ).group_by(CarbonEmission.scope)
    
    result = await db.execute(query)
    
    data = []
    scope_map = {
        EmissionScope.SCOPE_1: "范围一",
        EmissionScope.SCOPE_2: "范围二",
        EmissionScope.SCOPE_3: "范围三"
    }
    
    for row in result.all():
        data.append({
            "name": scope_map.get(row[0], row[0]),
            "value": round(row[1], 2)
        })
        
    return data
