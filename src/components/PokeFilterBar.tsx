import { useEffect, useRef } from "react";
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
  console.log("🎯 PokeFilterBar render - search:", search, "types:", types);

  // BroadcastChannel directement ici
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("pokemon-search");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      console.log("📥 FILTERBAR reçu:", event.data);
      if (event.data.type === "SEARCH_UPDATE") {
        onSearchChange(event.data.payload);
      }
      if (event.data.type === "TYPE_UPDATE") {
        onTypeChange(event.data.payload);
      }
    };

    return () => channel.close();
  }, [onSearchChange, onTypeChange]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={search}
        onChange={(e) => {
          console.log("🎯 Input onChange:", e.target.value);
          const newValue = e.target.value;
          onSearchChange(newValue);

          // Broadcaster directement
          if (channelRef.current) {
            channelRef.current.postMessage({
              type: "SEARCH_UPDATE",
              payload: newValue,
            });
            console.log("📤 FILTERBAR envoyé:", newValue);
          }
        }}
        className="border rounded px-2 py-1"
      />
      <select
        value={types[0] || ""}
        onChange={(e) => {
          console.log("🎯 Select onChange:", e.target.value);
          const newValue = e.target.value;
          onTypeChange(newValue);

          // Broadcaster directement
          if (channelRef.current) {
            channelRef.current.postMessage({
              type: "TYPE_UPDATE",
              payload: newValue,
            });
            console.log("📤 FILTERBAR envoyé TYPE:", newValue);
          }
        }}
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
