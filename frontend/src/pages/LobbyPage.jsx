const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function LobbyPage({ tableId, user }) {
  const [players, setPlayers] = useState([]);
  const [isGM, setIsGM] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join-lobby", { tableId, user });
    socket.on("lobby-players", data => setPlayers(data.players));
    socket.on("gm-assigned", () => setIsGM(true));
    socket.on("game-started", () => navigate(`/table/${tableId}`));
    return () => socket.disconnect();
  }, [tableId, user, navigate]);

  const startGame = () => socket.emit("start-game", { tableId });

  return (
    <div className="flex flex-col items-center min-h-screen bg-dndbg">
      <div className="bg-[#322018]/90 p-6 rounded-2xl mt-10 w-full max-w-lg">
        <h1 className="text-3xl font-dnd text-dndgold text-center mb-2">Лобі столу</h1>
        <div className="text-dndgold mb-2">Код для підключення: <b>{tableId}</b></div>
        <div className="text-dndgold mb-4">Гравці:</div>
        <ul>
          {players.map(pl => (
            <li key={pl._id} className="text-dndgold">{pl.name} {pl.role === "gm" ? "(GM)" : ""}</li>
          ))}
        </ul>
        {isGM && (
          <button className="bg-dndgold mt-6 rounded-2xl px-6 py-2 font-dnd" onClick={startGame}>
            Розпочати гру!
          </button>
        )}
      </div>
    </div>
  );
}
