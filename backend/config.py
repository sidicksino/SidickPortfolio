from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Fails fast at import if anything is missing — better than a 500 later."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str
    jwt_secret: str
    admin_email: str
    admin_password_hash: str

    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str

    # Comma-separated origins allowed to call this API.
    cors_origins: str = "http://localhost:5173"

    token_ttl_hours: int = 12

    # Kept server-side deliberately: if the dashboard called Vercel directly,
    # the hook would sit in the browser bundle for anyone to fire.
    vercel_deploy_hook: str = ''

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
