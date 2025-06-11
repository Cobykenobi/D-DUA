
const CreateCharacterPage = () => {;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {;
    e.preventDefault();
    const newChar = await createCharacter({ name, description });
    if (newChar && newChar._id) {
      navigate('/lobby?char=' + newChar._id);
    }
  };

  return (
    <div>
      <h2>Створення персонажа</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ім’я персонажа"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Опис або історія"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default CreateCharacterPage;
