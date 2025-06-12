import React from "react";

export default function BrightnessControl({ value, onChange }) {
  return (
    <div>
      <label>Brightness</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}