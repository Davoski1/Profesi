from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# User Registration Request
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=2)
    country: str = Field(..., min_length=2)
    city: str = Field(..., min_length=2)

# User Login Request
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# User Response
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    country: str
    city: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Token Data
class TokenData(BaseModel):
    sub: Optional[str] = None
    exp: Optional[datetime] = None
