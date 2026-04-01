
import asyncio
import sys
import os
import uuid
import random
import traceback
from datetime import datetime, timezone

# 添加项目根目录到 sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from app.core.database import engine
from app.models.tenant import Tenant, TenantStatus, TenantPlan
from app.models.user import User, UserRole, UserStatus
from app.core.security import get_password_hash

# Mock Data
MOCK_TENANTS = [
    {
        "name": "苏州工业园 A 区",
        "code": "suzhou_sip_a",
        "plan": TenantPlan.ENTERPRISE,
        "email": "admin@sip-a.com"
    },
    {
        "name": "高新区科创园",
        "code": "snd_tech_park",
        "plan": TenantPlan.PRO,
        "email": "manager@snd-tech.com"
    },
    {
        "name": "吴中生物医药港",
        "code": "wuzhong_bio",
        "plan": TenantPlan.ESSENTIAL,
        "email": "contact@bio-port.com"
    },
    {
        "name": "昆山智能制造基地",
        "code": "kunshan_smart",
        "plan": TenantPlan.PRO,
        "email": "ops@kunshan-mfg.com"
    },
    {
        "name": "相城数字经济产业园",
        "code": "xiangcheng_digital",
        "plan": TenantPlan.ESSENTIAL,
        "email": "info@xc-digital.com"
    }
]

async def seed_data():
    print("🌱 Seeding simulated tenant data...")
    
    try:
        async_session = sessionmaker(
            engine, class_=AsyncSession, expire_on_commit=False
        )

        async with async_session() as session:
            for t_data in MOCK_TENANTS:
                # Check if exists
                stmt = select(Tenant).where(Tenant.code == t_data['code'])
                result = await session.execute(stmt)
                if result.scalar_one_or_none():
                    print(f"Skipping existing tenant: {t_data['code']}")
                    continue

                # Create Tenant
                tenant_id = uuid.uuid4()
                tenant = Tenant(
                    id=tenant_id,
                    name=t_data["name"],
                    code=t_data["code"],
                    plan=t_data["plan"],
                    status=TenantStatus.ACTIVE,
                    contact_email=t_data["email"],
                    created_at=datetime.now(timezone.utc)
                )
                session.add(tenant)
                
                # Create Tenant Admin
                admin_user = User(
                    id=uuid.uuid4(),
                    tenant_id=tenant_id,
                    email=t_data["email"],
                    password_hash=get_password_hash(os.getenv("SEED_PASSWORD", "ScdC@2026!Prod")), # Default password
                    full_name=t_data["name"] + " 管理员",
                    role=UserRole.ADMIN,
                    status=UserStatus.ACTIVE,
                    created_at=datetime.now(timezone.utc)
                )
                session.add(admin_user)
                
                # Create some random users
                user_count = random.randint(3, 15)
                for i in range(user_count):
                    user_email = f"user{i}@{t_data['code']}.com"
                    user = User(
                        id=uuid.uuid4(),
                        tenant_id=tenant_id,
                        email=user_email,
                        password_hash=get_password_hash(os.getenv("SEED_PASSWORD", "ScdC@2026!Prod")),
                        full_name=f"员工 {i+1}",
                        role=UserRole.USER,
                        status=UserStatus.ACTIVE,
                        created_at=datetime.now(timezone.utc)
                    )
                    session.add(user)

                print(f"[{t_data['code']}] Created tenant. Admin: {t_data['email']} / ScdC@2026!Prod")

            await session.commit()
    except Exception:
        traceback.print_exc()

    print("✅ Seeding complete!")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed_data())
