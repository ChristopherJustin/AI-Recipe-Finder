from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import List, Union

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "AI Recipe Finder"
    app_version: str = "1.0.0"
    environment: str = "development"

    database_url: str = "sqlite:///./app.db"

    secret_key: str = "change-me-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 7

    gemini_api_key: str | None = None

    email_from: str | None = None
    email_to: str | None = None
    email_password: str | None = None

    frontend_url: str = "http://localhost:5173"
    cors_origins: Union[List[str], str] = []

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value


settings = Settings()