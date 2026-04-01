"""
Seed platform super-admin user.
Idempotent: safe to run multiple times.

Usage: python scripts/seed_admin.py
"""
import asyncio
import sys
import os
import uuid
from datetime import datetime, timezone

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.database import engine
from app.core.security import get_password_hash
from app.models.user import User, UserRole, UserStatus

ADMIN_EMAIL = 'admin@scdc.cloud'
ADMIN_PASSWORD = 'Admin@2026!'


async def seed_admin():
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )

    async with async_session() as session:
        stmt = select(User).where(User.email == ADMIN_EMAIL)
        result = await session.execute(stmt)
        existing = result.scalar_one_or_none()

        if existing:
            print(f"⏭️  Super-admin already exists: {ADMIN_EMAIL}")
            return

        user = User(
            id=uuid.uuid4(),
            tenant_id=uuid.UUID('00000000-0000-0000-0000-000000000000'),  # system tenant placeholder
            email=ADMIN_EMAIL,
            password_hash=get_password_hash(ADMIN_PASSWORD),
            full_name='SCDC Super Admin',
            role=UserRole.ADMIN,
            status=UserStatus.ACTIVE,
            created_at=datetime.now(timezone.utc),
        )
        session.add(user)
        await session.commit()
        print(f"✅ Created super-admin: {ADMIN_EMAIL} / {ADMIN_PASSWORD}")


if __name__ == '__main__':
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed_admin())
