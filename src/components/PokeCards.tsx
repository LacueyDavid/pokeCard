import { fetchPokemons } from "../api/pokemonApi";
import { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";

type PokeCardsProps = {
  currentPage: number;
  pageSize: number;
};

export default function PokeCards({ currentPage, pageSize }: PokeCardsProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemons(currentPage, pageSize).then(setPokemons);
  }, [currentPage, pageSize]);

  const mid = Math.ceil(pokemons.length / 2);
  const firstHalf = pokemons.slice(0, mid);
  const secondHalf = pokemons.slice(mid);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-4 row">
        {firstHalf
          .filter((pokemon) => pokemon.id <= 151)
          .map((pokemon, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs mx-auto"
            >
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
      </div>
      <div className="flex justify-center gap-4 row">
        {secondHalf
          .filter((pokemon) => pokemon.id <= 151)
          .map((pokemon, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs mx-auto"
            >
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3 className="text-center">{pokemon.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
