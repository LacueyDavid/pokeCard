import { fetchAllPokemons } from "../api/fetchAllPokemons";
import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";
import PokeLine from "./PokeLine";
import PokeFilterBar from "./PokeFilterBar";

type PokeCardsProps = {
  currentPage: number;
  pageSize: number;
  onFilteredCountChange: (count: number) => void;
};

export default function PokeCards({
  currentPage,
  pageSize,
  onFilteredCountChange,
}: PokeCardsProps) {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchAllPokemons().then(setAllPokemons);
  }, []);

  // Filtrage par nom et type
  const filtered = allPokemons.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchType =
      !type || (p.types && p.types.some((t) => t.type.name === type));
    return matchName && matchType;
  });

  // Informer le parent du nombre de résultats filtrés
  useEffect(() => {
    onFilteredCountChange(filtered.length);
  }, [filtered.length, onFilteredCountChange]);

  // Pagination sur les résultats filtrés
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paged = filtered.slice(start, end);

  const mid = Math.ceil(paged.length / 2);
  const firstHalf = paged.slice(0, mid);
  const secondHalf = paged.slice(mid);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <PokeFilterBar
        types={type ? [type] : []}
        onTypeChange={setType}
        search={search}
        onSearchChange={setSearch}
      />
      <PokeLine pokemons={firstHalf} />
      <PokeLine pokemons={secondHalf} />
    </div>
  );
}
