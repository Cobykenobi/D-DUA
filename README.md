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
   - `VITE_API_URL` – base URL of the backend API (e.g. `http://localhost:5000/api`).
     This host is also used to build absolute URLs for uploaded images.
   - `VITE_SOCKET_URL` – URL of the Socket.io server (e.g. `http://localhost:5000`)

3. **Seed starter data** (optional)

   After updating your `.env` file, populate the database with approximately
   ten races and ten professions along with five core characteristics:

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

## Character Basics

Characters use five core statistics which start at **10** each:

- **STR** – Strength
- **DEX** – Dexterity
- **INT** – Intelligence
- **CON** – Constitution
- **CHA** – Charisma

### Races and Bonuses

Ten playable races provide bonuses to these stats:

- Human – +1 to all stats
- Elf – +2 DEX, +1 INT
- Orc – +2 STR, +1 CON
- Gnome – +2 CON, +1 INT
- Dwarf – +2 STR, +1 CHA
- Halfling – +2 DEX, +1 CHA
- Demon – +2 INT, +1 CHA
- Beastkin – +2 DEX, +1 CON
- Angel – +2 CHA, +1 INT
- Lizardman – +2 STR, +1 CON

### Classes and Minimums

Seven classes require minimum statistics:

- Warrior – STR 13, CON 12
- Mage – INT 13, CHA 11
- Rogue – DEX 13, INT 11
- Healer – CHA 13, CON 11
- Ranger – DEX 12, STR 12
- Bard – CHA 13, DEX 12
- Paladin – STR 13, CHA 13

### Stat Generation

When creating a character, the race bonuses are applied first. Any class minimums are enforced next. All remaining stats are randomised between **8** and **15** but never lowered below their current values.

```js
const stats = generateStats('Elf', 'Mage');
// => { STR: 10, DEX: 12, INT: 13, CON: 10, CHA: 11 }
```

### Starter Inventory

Each class begins with a predefined set of equipment which can be supplemented by race-specific items. The `generateInventory` utility merges these sets when a character is created.

```js
const inventory = generateInventory('Orc', 'Warrior');
// => ['Меч', 'Щит', 'Шкіряна броня', 'Зілля здоров’я', 'Кістяний талісман']
```
