from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from config import settings

ALGORITHM = "HS256"
bearer = HTTPBearer(auto_error=False)


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_token(subject: str) -> str:
    now = datetime.now(timezone.utc)
    return jwt.encode(
        {
            "sub": subject,
            "iat": now,
            "exp": now + timedelta(hours=settings.token_ttl_hours),
        },
        settings.jwt_secret,
        algorithm=ALGORITHM,
    )


def require_admin(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer),
) -> str:
    """Guards every write. Reads stay public — the portfolio needs them."""
    if creds is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authenticated")
    try:
        payload = jwt.decode(
            creds.credentials, settings.jwt_secret, algorithms=[ALGORITHM]
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid token")

    if payload.get("sub") != settings.admin_email:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not permitted")
    return payload["sub"]
