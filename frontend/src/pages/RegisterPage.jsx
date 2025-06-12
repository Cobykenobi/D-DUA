
import axios from "axios";

function RegisterPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {;
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {;
        login,
        password,
      });

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {;
        login,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Помилка реєстрації");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
        onSubmit={handleRegister}
        className="bg-white shadow-md p-8 rounded w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Реєстрація</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Логін"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
