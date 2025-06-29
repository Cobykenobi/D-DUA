# D-DUA

This project combines an Express/MongoDB backend with a React frontend.

## Setup

This project targets Node.js **v20** as specified in `.nvmrc`. Run
`nvm use` (or an equivalent command) to ensure you're using this
version before continuing.

1. **Install dependencies**
   Run the helper script to install packages in both subprojects:

   ```bash
   ./setup.sh
   ```

   This installs tools like `cross-env`, **Jest** and **ESLint** used by the
   project. **Always run `./setup.sh` before executing `npm test` or
   `npm run lint`** in either subproject. Attempting those commands without
   installing dependencies first will fail.

   You may optionally run `npm audit fix --force` inside `backend` and
   `frontend` to address any security warnings.

   If `npm audit` prints warnings afterwards, you can run `npm audit fix`
   (or `npm audit fix --force` if necessary) in each directory to address
   potential vulnerabilities.

2. **Environment variables**
   Copy `backend/.env.example` to `backend/.env` and adjust the values:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – secret used for signing tokens
   - `PORT` – optional server port (defaults to `5000`)
   - `CLIENT_URL` – allowed origin(s) for CORS. Set this to the URL of your frontend (comma separated to allow multiple, e.g. `http://localhost:5173,https://example.com`).
  - `OPENAI_API_KEY` – optional key used to generate avatars via OpenAI APIs.

   Create a `.env` file inside `frontend` with the following keys:
   - `VITE_API_URL` – base URL of the backend API (e.g. `http://localhost:5000/api`).
     This host is also used to build absolute URLs for uploaded images.
   - `VITE_SOCKET_URL` – URL of the Socket.io server (e.g. `http://localhost:5000`)

3. **Seed starter data** (optional)

   After creating `backend/.env`, populate the database with starter races,
   professions and core attributes:

   ```bash
   node backend/scripts/seed.js
   ```

   Verify that the `races` and `professions` collections contain codes defined
   in `allowedRaceCodes` and `allowedClassCodes` inside
   `backend/src/controllers/characterController.js`. This script also creates an
   admin account with login **root** and password **kolokol911**. You must sign
   in with this account to access `/admin`.

## Running the app

### Backend

```bash
cd backend
npm run dev
```

The backend automatically creates `uploads/` and `uploads/maps/` directories for uploaded files and exposes them from the `/uploads` path. Preset avatars are served from `/avatars`.

### Frontend

```bash
cd frontend
npm run dev
```

Vite prints the local URL once the frontend server starts.

### Building the frontend

Create a production build of the React app:

```bash
cd frontend
npm run build
```

The resulting files are written to `frontend/dist`. Serve this directory with
any static web server, for example:

```bash
npx serve -s dist
```

### Backend production

After configuring your environment variables, start the backend in production
mode with:

```bash
cd backend
npm start
```

## Running tests

Both subprojects use **Jest**. Ensure dependencies are installed before running
the tests (you can run `./setup.sh` at the project root). Each test command
first runs a small check that warns if `node_modules` are missing. Run the test
suites from their respective folders:

```bash
cd backend
npm test

cd ../frontend
npm test
```

Frontend tests require the `NODE_OPTIONS=--experimental-vm-modules` flag which
is already defined in the `frontend/package.json` test script.

## Navigation

After signing in, players and game masters land on different pages. Regular players
are redirected to `/characters` where they can manage their heroes. Users with the
`gm` role start at `/gm-dashboard` and gain access to additional GM routes:

- `/gm-dashboard` – overview for game masters
- `/gm-table/:tableId` – run a specific table
- `/gm-control/:tableId` – manage player controls

These routes are protected in the frontend using `PrivateRoute`, which now checks
the stored user role.

## Linting and formatting

ESLint and Prettier configuration live in the `backend` folder. Ensure you've run
`./setup.sh` so dependencies are installed before linting. The lint scripts also
check that `node_modules` exist. You can lint and format the backend code with:

```bash
cd backend
npm run lint
npm run format
```

You can lint the frontend code with:

```bash
cd frontend
npm run lint
```
Both lint commands run a pre-check that warns if `node_modules` are missing.

## Character Basics

Every adventurer starts with six basic attributes. Each begins at **5** before
any racial or class bonuses are applied:

- **Health**
- **Defense**
- **Strength**
- **Intellect**
- **Agility**
- **Charisma**

### Races and Bonuses

Choosing a race grants specific bonuses to your starting stats:

- **Людина (чоловік)**
- **Людина (жінка)**
- **Ельф (чоловік)**
- **Ельф (жінка)**
- **Орк (чоловік)**
- **Орк (жінка)**
- **Гном (чоловік)**
- **Гном (жінка)**
- **Дварф (чоловік)**
- **Дварф (жінка)**

### Professions

Each profession grants bonuses to your starting stats:

- **Warrior** – +2 Strength, +1 Defense
- **Wizard** – +2 Intellect, +1 MP
- **Assassin** – +1 Strength, +1 Agility
- **Paladin** – +1 Health, +1 Strength, +1 Charisma
- **Bard** – +1 Charisma
- **Archer** – +2 Agility, +1 Strength
- **Healer** – +1 Intellect, +1 Charisma, +1 MP

### Stat Generation

When generating stats, race bonuses apply first. Profession bonuses are then
added. Attributes not modified by race or profession are randomised between
**3** and **10**, but never drop below their current value.

```js

const stats = generateStats('elf', 'wizard');

// => { health: 5, defense: 5, strength: 5, intellect: 7, agility: 5, charisma: 5, mp: 6 }
```

### Starter Inventory

Starting equipment now depends on **both** race and class. The seed script used to populate an `inventorySets` object with sample items. After cleaning the repository these sets are empty so you can add your own items.

```js
const inventorySets = {
  orc_male: {
    warrior: [
      // add starter item arrays here
    ]
  }
};

const inventory = generateInventory('Орк (чоловік)', 'Воїн');
// => []
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for development and binary asset guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
