# D-DUA

This project combines an Express/MongoDB backend with a React frontend.

## Setup

1. **Install dependencies**
   Run the helper script to install packages in both subprojects:

   ```bash
   ./setup.sh
   ```
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

   Create a `.env` file inside `frontend` with the following keys:
   - `VITE_API_URL` – base URL of the backend API (e.g. `http://localhost:5000/api`).
     This host is also used to build absolute URLs for uploaded images.
   - `VITE_SOCKET_URL` – URL of the Socket.io server (e.g. `http://localhost:5000`)

3. **Seed starter data** (optional)

   After updating your `.env` file, populate the database with approximately
   ten races and six professions along with six core characteristics:

   ```bash
   cd backend
   node scripts/seed.js
   ```

   This script also creates an admin account with login **root** and password

   **kolokol911**. You must sign in with this account to access `/admin`.

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

Both the backend and frontend use **Jest**. Ensure dependencies are installed in
each directory (run `./setup.sh` if you haven't already) and then execute:

```bash
cd backend && npm test
cd ../frontend && npm test
```

## Navigation

After signing in, players and game masters land on different pages. Regular players
are redirected to `/characters` where they can manage their heroes. Users with the
`master` role start at `/gm-dashboard` and gain access to additional GM routes:

- `/gm-dashboard` – overview for game masters
- `/gm-table/:id` – run a specific table
- `/gm-control/:id` – manage player controls

These routes are protected in the frontend using `PrivateRoute`, which now checks
the stored user role.

## Linting and formatting

ESLint and Prettier configuration live in the `backend` folder. You can lint and
format the backend code with:

```bash
cd backend
npm run lint
npm run format
```

The frontend does not currently include separate lint or format commands.

## Character Basics

Every adventurer starts with five basic attributes. All of them have a value of
**10** before any racial or class adjustments are applied:

- **STR** – Strength
- **DEX** – Dexterity
- **INT** – Intelligence
- **CON** – Constitution
- **CHA** – Charisma

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

### Classes and Minimums

Each of the six classes expects certain ability thresholds before the hero can
take up the role:

- **Warrior** – STR 13, CON 12
- **Mage** – INT 13, CHA 11
- **Archer** – DEX 12, STR 12
- **Healer** – CHA 13, CON 11
- **Bard** – CHA 13, DEX 12
- **Paladin** – STR 13, CHA 13

### Stat Generation

When generating stats, race bonuses apply first. Class minimums then raise any
insufficient attributes. Finally, untouched stats are randomised between **3**
and **10**, but never drop below their current value.

```js
const stats = generateStats('Ельф (жінка)', 'Маг');
// => { STR: 10, DEX: 12, INT: 13, CON: 10, CHA: 11 }
```

### Starter Inventory

Each class provides a starter kit of equipment. Race specific trinkets are then
added to the pack. The `generateInventory` helper merges both lists when a
character is created.

```js
const inventory = generateInventory('Орк (чоловік)', 'Воїн');
// => ['Меч', 'Щит', 'Шкіряна броня', 'Зілля здоров’я', 'Кістяний талісман']
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for development and binary asset guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
