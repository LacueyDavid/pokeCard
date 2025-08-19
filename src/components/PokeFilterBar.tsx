import { typeColors } from "./typeColors";

export default function PokeFilterBar({
  types,
  onTypeChange,
  search,
  onSearchChange,
}: {
  types: string[];
  onTypeChange: (type: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <select
        value={types[0] || ""}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">Tous les types</option>
        {Object.entries(typeColors).map(([type, color]) => (
          <option
            key={type}
            value={type}
            style={{ background: color, color: "#fff" }}
          >
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
