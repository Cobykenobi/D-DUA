# D-DUA

This project combines an Express/MongoDB backend with a React frontend.

## Setup

1. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Environment variables**
   Copy `backend/.env.example` to `backend/.env` and adjust the values:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – secret used for signing tokens
   - `OPENAI_API_KEY` – API key for generating images and descriptions
   - `PORT` – optional server port (defaults to `5000`)
   - `CLIENT_URL` – allowed origin(s) for CORS. Set this to the URL of your frontend (comma separated to allow multiple, e.g. `http://localhost:5173,https://example.com`).

   Create a `.env` file inside `frontend` with the following keys:
   - `VITE_API_URL` – base URL of the backend API (e.g. `http://localhost:5000/api`)
   - `VITE_SOCKET_URL` – URL of the Socket.io server (e.g. `http://localhost:5000`)

3. **Seed starter data** (optional)

   Populate the database with approximately ten races and ten professions
   along with five core characteristics:

   ```bash
   cd backend
   node scripts/seed.js
   ```

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

## Running tests

The backend uses **Jest** for its test suite. After installing dependencies you
can run the tests with:

```bash
cd backend
npm test
```
