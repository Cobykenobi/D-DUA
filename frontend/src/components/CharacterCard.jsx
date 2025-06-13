
export default function CharacterCard({ character, onEdit, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", marginBottom: 12, padding: 8 }}>
      <img
        src={character.image || "/default-avatar.png"}
        alt={character.name}
        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
      />
      <h3>{character.name}</h3>
      <div>
        <strong>Раса:</strong> {character.race?.name || "—"}
      </div>
      <div>
        <strong>Клас:</strong> {character.profession?.name || "—"}
      </div>
      <div>
        <strong>Опис:</strong> {character.description || "—"}
      </div>
      <div style={{ marginTop: 8 }}>
        <div><strong>Стати:</strong></div>
        {character.stats && (
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {Object.entries(character.stats).map(([key, val]) => (
              <li key={key}>{key}: {val}</li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: 8 }}>
        <div><strong>Інвентар:</strong></div>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {character.inventory && character.inventory.map((it, idx) => (
            <li key={idx}>{it.item} {it.amount > 1 ? `x${it.amount}` : ""}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 8 }}>
        {onEdit && (
          <button onClick={() => onEdit(character)}>Редагувати</button>
        )}
        {onDelete && (
          <button style={{ marginLeft: 8 }} onClick={() => onDelete(character._id || character.id)}>
            Видалити
          </button>
        )}
      </div>
    </div>
  );
}
