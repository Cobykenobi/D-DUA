# D-DUA

D-DUA is a simple online tabletop project inspired by Dungeons & Dragons. The backend is written in Node.js/Express with MongoDB for storage while the frontend uses React, Vite and Tailwind CSS.

## Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** instance for the backend

## Environment variables

Create `.env` files (or otherwise export variables) for both parts:

### Backend
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – secret used to sign JSON Web Tokens
- `OPENAI_API_KEY` – API key for optional AI features
- `PORT` – port to run the server (defaults to `5000`)

### Frontend
- `VITE_API_URL` – base URL of the backend API (e.g. `http://localhost:5000/api`)

## Development

```bash
# start the API
cd backend
npm install
npm run dev
```

```bash
# start the React app
cd frontend
npm install
npm run dev
```

## Production

```bash
# backend
cd backend
npm install
npm start
```

```bash
# frontend
cd frontend
npm install
npm run build
npm run start
```

`npm run build` creates the static assets in the `build` directory and `npm run start` serves them using `serve`.
