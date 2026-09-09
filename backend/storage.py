import cloudinary
import cloudinary.uploader

from config import settings

cloudinary.config(
    cloud_name=settings.cloudinary_cloud_name,
    api_key=settings.cloudinary_api_key,
    api_secret=settings.cloudinary_api_secret,
    secure=True,
)

FOLDER = "portfolio/projects"


def upload_image(file_bytes: bytes, public_id: str | None = None) -> dict:
    """Uploads and returns {image_url, image_public_id}.

    Delivered as WebP at a capped width — the existing screenshots render at
    ~340px in the grid, so shipping full-size originals would be waste.
    """
    res = cloudinary.uploader.upload(
        file_bytes,
        folder=FOLDER,
        public_id=public_id,
        overwrite=True,
        resource_type="image",
        format="webp",
        transformation=[{"width": 1200, "crop": "limit", "quality": "auto"}],
    )
    return {"image_url": res["secure_url"], "image_public_id": res["public_id"]}


def delete_image(public_id: str) -> None:
    """Best-effort: a failed cleanup must not block deleting the project."""
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception:
        pass
