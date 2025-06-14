# Manual QA Instructions for Lobby to Table Flow

1. Start the backend and frontend servers:
   ```bash
   cd backend && npm run dev
   ```
   In a new terminal:
   ```bash
   cd frontend && npm run dev
   ```

2. Open the frontend in two separate browser windows.
3. In the first window navigate to `/lobby`. A table code will appear in the UI and in the URL as `?table=CODE`.
4. Copy the full URL from the first window and open it in the second window to join the same lobby.
5. In the first window (the game master), click **"Розпочати гру!"**.
6. Verify that *both* windows automatically navigate to `/table/CODE` where `CODE` matches the lobby ID.
