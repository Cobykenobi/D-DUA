# D-DUA

This project combines an Express/MongoDB backend with a React frontend.

## Setup

1. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Environment variables**
   Create a `.env` file inside `backend` with the following keys:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – secret used for signing tokens
   - `OPENAI_API_KEY` – API key for generating images and descriptions
   - `PORT` – optional server port (defaults to `5000`)

## Running the app

### Backend

```bash
cd backend
npm run dev
```

The backend automatically creates `uploads/` and `uploads/maps/` directories for uploaded files and exposes them from the `/uploads` path.

### Frontend

```bash
cd frontend
npm run dev
```

Vite prints the local URL once the frontend server starts.
