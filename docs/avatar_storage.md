# Avatar image storage evaluation

## Current status
- The repository includes avatar assets in `frontend/public/avatars` and a default avatar in `frontend/public/default-avatar.png`.
- These assets total about 40 KB.
- Other static images such as map backgrounds account for approximately 4.8 MB.

## Using a CDN or object storage
Hosting the avatars on a CDN (Content Delivery Network) or object storage service (e.g. S3, Cloudflare R2, GCS) would:
- reduce repository size and clone times;
- allow efficient caching and global distribution; and
- require additional configuration and infrastructure (access keys, base URL, upload process).

Given the small size and infrequent updates of the current avatars, the added complexity may not be justified.

## Recommendation
Keeping the avatars in git is acceptable while their total size remains under 100 KB. Reevaluate if more binary images are added or if users start uploading many custom avatars.

## File naming and fallback avatars

Uploaded or AI-generated images are saved to `uploads/avatars` using a timestamp
based filename (e.g. `1678890123456.png`). This avoids collisions when multiple
files are written at the same time.

When no avatar is provided during character creation, the backend tries to
generate one via the configured AI service. If `OPENAI_API_KEY` is missing, a
random preset from `frontend/public/avatars` is used instead.
