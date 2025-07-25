import { fetchPokemons } from "../api/pokemonApi";
import { useEffect, useState } from "react";

type PokeCardsProps = {
  currentPage: number;
  pageSize: number;
};

type Pokemon = {
  name: string;
  url: string;
};

export default function PokeCards({ currentPage, pageSize }: PokeCardsProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    async function loadPokemons() {
      try {
        const data = await fetchPokemons(currentPage, pageSize);
        setPokemons(data.results);
      } catch (error) {
        console.error("Failed to fetch pokemons:", error);
      }
    }
    loadPokemons();
  }, [currentPage, pageSize]);

  return (
    <div className="poke-cards">
      {pokemons.map((pokemon, index) => (
        <div key={index} className="poke-card">
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
}
