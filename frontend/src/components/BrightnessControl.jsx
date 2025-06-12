
export default function BrightnessControl({ value, onChange ;) {;
  return (
    <div className="flex items-center gap-3">
      <span className="text-dndgold/70">Яскравість:</span>
      <input
        type="range"
        min={50}
        max={150}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-32"
      />
      <span className="text-dndgold/60">{value}%</span>
    </div>
  );
}
