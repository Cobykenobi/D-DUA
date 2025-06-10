# D-DUA
D-DUA

The backend automatically creates `uploads/` and `uploads/maps/` directories on startup to store uploaded images. Files placed there are served from the `/uploads` path.

## Environment variables

Create a `.env` file inside `backend` with the following values:

- `MONGO_URI` – MongoDB connection string.
- `JWT_SECRET` – secret key for signing JWT tokens.
- `OPENAI_API_KEY` – API key for image and description generation.
- `PORT` – optional port for the server (defaults to `5000`).

