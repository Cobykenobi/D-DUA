# D-DUA

D-DUA is a small demo project with a Node.js/Express backend and a React + Vite frontend.

## Installation

1. Clone this repository.
2. Install dependencies for both the backend and frontend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

## Environment configuration

### Backend `.env`
Create a `.env` file inside `backend` with at least the following variables:

```
PORT=5000                # Port for the API server
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-secret>
OPENAI_API_KEY=<your-openai-key>
```

### Frontend `.env`
Create a `.env` file inside `frontend` and define the API url used by the client:

```
VITE_API_URL=http://localhost:5000/api
```
Change this to your deployed API endpoint when hosting in production.

## Running locally

Start the backend and frontend development servers in separate terminals:

```bash
# Backend
cd backend && npm run dev
# Frontend
cd ../frontend && npm run dev
```

The React app will be available on the port printed by Vite (usually `http://localhost:5173`).

## Build & deploy to Render

Render can host both the API and the static frontend.

1. **Backend** – create a new **Web Service** on Render from this repo. Set the build command to:
   ```bash
   cd backend && npm install
   ```
   and the start command to:
   ```bash
   node src/app.js
   ```
   Configure the environment variables from the `.env` file in the service settings.

2. **Frontend** – create a **Static Site**. Use the build command:
   ```bash
   cd frontend && npm install && npm run build
   ```
   Set the publish directory to `frontend/dist`.
   Define `VITE_API_URL` in the environment so the frontend can talk to your backend service.

After deployment you can update the `.env` files locally with your Render URLs to mirror the production configuration.
