from typing import Annotated, Literal

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    HttpUrl,
    StringConstraints,
    field_validator,
)

Category = Literal["web", "mobile", "design", "ai"]

# strip_whitespace matters: with plain min_length=1, a title of "   " has
# length 3 and sails through, and only the database CHECK catches it — as a
# 500 instead of a 422. Strip first, then require content.
NonEmpty = Annotated[
    str, StringConstraints(strip_whitespace=True, min_length=1, max_length=400)
]
Prose = Annotated[
    str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)
]


class LoginIn(BaseModel):
    email: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProjectBase(BaseModel):
    category: Category
    title_en: NonEmpty
    title_fr: NonEmpty
    description_en: Prose
    description_fr: Prose
    technologies: list[str] = []
    live_url: HttpUrl | None = None
    github_url: HttpUrl | None = None
    featured: bool = False
    featured_order: int = 0
    sort_order: int = 0

    @field_validator("technologies")
    @classmethod
    def clean_techs(cls, v: list[str]) -> list[str]:
        # Trim, drop blanks, de-duplicate while keeping order.
        seen, out = set(), []
        for t in (x.strip() for x in v):
            if t and t.lower() not in seen:
                seen.add(t.lower())
                out.append(t)
        return out


class ProjectCreate(ProjectBase):
    # Required here even though the column is nullable: legacy rows may lack an
    # image, but nothing added through the dashboard should.
    image_url: HttpUrl
    image_public_id: str | None = None


class ProjectUpdate(BaseModel):
    """All optional — PATCH semantics, only send what changed."""

    model_config = ConfigDict(extra="forbid")

    category: Category | None = None
    title_en: NonEmpty | None = None
    title_fr: NonEmpty | None = None
    description_en: Prose | None = None
    description_fr: Prose | None = None
    technologies: list[str] | None = None
    image_url: HttpUrl | None = None
    image_public_id: str | None = None
    live_url: HttpUrl | None = None
    github_url: HttpUrl | None = None
    featured: bool | None = None
    featured_order: int | None = None
    sort_order: int | None = None


class ProjectOut(ProjectBase):
    id: int
    image_url: str | None = None
    image_public_id: str | None = None


class UploadOut(BaseModel):
    image_url: str
    image_public_id: str
