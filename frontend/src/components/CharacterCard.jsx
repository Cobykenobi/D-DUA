import React from "react";

export default function CharacterCard({ character, onEdit, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", marginBottom: 12, padding: 8 }}>
      <h3>{character.name}</h3>
      <div><strong>Опис:</strong> {character.description || "—"}</div>
      {/* додай інші поля, якщо треба */}
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
