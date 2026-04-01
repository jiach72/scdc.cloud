"""
组织管理 API 路由
"""

import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


from app.core.database import get_db
from app.models.organization import Organization, OrganizationType
from app.schemas.organization import (
    OrganizationCreate, 
    OrganizationUpdate, 
    OrganizationResponse,
    OrganizationTree
)
from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter(prefix="/organizations", tags=["组织管理"])


@router.post("/", response_model=OrganizationResponse, status_code=status.HTTP_201_CREATED)
async def create_organization(
    org_data: OrganizationCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """创建组织（园区/企业/车间）"""
    # 检查代码是否重复
    result = await db.execute(select(Organization).where(Organization.code == org_data.code))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="组织代码已存在"
        )
    
    # 如果有父组织，验证父组织存在
    if org_data.parent_id:
        parent = await db.execute(
            select(Organization).where(Organization.id == org_data.parent_id)
        )
        if not parent.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="父组织不存在"
            )
    
    org = Organization(
        name=org_data.name,
        code=org_data.code,
        type=OrganizationType(org_data.type),
        parent_id=org_data.parent_id,
        address=org_data.address,
        contact_name=org_data.contact_name,
        contact_phone=org_data.contact_phone,
        description=org_data.description,
        industry_code=org_data.industry_code,
        area_sqm=org_data.area_sqm,
        tenant_id=current_user.tenant_id,
    )
    db.add(org)
    await db.commit()
    await db.refresh(org)
    
    return org


@router.get("/", response_model=list[OrganizationResponse])
async def list_organizations(
    type: Optional[str] = Query(None, description="组织类型: park/enterprise/workshop"),
    parent_id: Optional[uuid.UUID] = Query(None, description="父组织ID"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """获取组织列表"""
    query = select(Organization)
    if current_user.tenant_id:
        query = query.where(Organization.tenant_id == current_user.tenant_id)
    
    if type:
        query = query.where(Organization.type == OrganizationType(type))
    if parent_id:
        query = query.where(Organization.parent_id == parent_id)
    
    result = await db.execute(query.order_by(Organization.created_at.desc()))
    return result.scalars().all()


@router.get("/tree", response_model=list[OrganizationTree])
async def get_organization_tree(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """获取组织树结构（从园区开始）"""
    # 一次性加载该租户所有组织（消除 N+1）
    query = select(Organization)
    if current_user.tenant_id:
        query = query.where(Organization.tenant_id == current_user.tenant_id)
    result = await db.execute(query)
    all_orgs = result.scalars().all()

    # 构建映射和树
    children_map: dict[uuid.UUID | None, list[Organization]] = {}
    for org in all_orgs:
        children_map.setdefault(org.parent_id, []).append(org)

    def build_tree(org: Organization) -> OrganizationTree:
        children = children_map.get(org.id, [])
        return OrganizationTree(
            id=org.id,
            name=org.name,
            code=org.code,
            type=org.type.value if hasattr(org.type, 'value') else org.type,
            parent_id=org.parent_id,
            address=org.address,
            contact_name=org.contact_name,
            contact_phone=org.contact_phone,
            description=org.description,
            industry_code=org.industry_code,
            area_sqm=org.area_sqm,
            created_at=org.created_at,
            updated_at=org.updated_at,
            children=[build_tree(child) for child in children]
        )

    # 顶级组织（parent_id == None）
    roots = children_map.get(None, [])
    return [build_tree(root) for root in roots]


@router.get("/{org_id}", response_model=OrganizationResponse)
async def get_organization(
    org_id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """获取组织详情"""
    query = select(Organization).where(Organization.id == org_id)
    if current_user.tenant_id:
        query = query.where(Organization.tenant_id == current_user.tenant_id)
    result = await db.execute(query)
    org = result.scalar_one_or_none()
    
    if not org:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="组织不存在"
        )
    
    return org


@router.put("/{org_id}", response_model=OrganizationResponse)
async def update_organization(
    org_id: uuid.UUID,
    org_data: OrganizationUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """更新组织信息"""
    query = select(Organization).where(Organization.id == org_id)
    if current_user.tenant_id:
        query = query.where(Organization.tenant_id == current_user.tenant_id)
    result = await db.execute(query)
    org = result.scalar_one_or_none()
    
    if not org:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="组织不存在"
        )
    
    # 更新字段
    update_data = org_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(org, field, value)
    
    await db.commit()
    await db.refresh(org)
    
    return org


@router.delete("/{org_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_organization(
    org_id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """删除组织"""
    query = select(Organization).where(Organization.id == org_id)
    if current_user.tenant_id:
        query = query.where(Organization.tenant_id == current_user.tenant_id)
    result = await db.execute(query)
    org = result.scalar_one_or_none()
    
    if not org:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="组织不存在"
        )
    
    # 检查是否有子组织
    children = await db.execute(
        select(Organization).where(Organization.parent_id == org_id)
    )
    if children.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该组织下有子组织，无法删除"
        )
    
    await db.delete(org)
    await db.commit()
