import useSWR from "swr";
import type { Pokemon } from "../types/Pokemon";

// Fetcher function pour SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
};

// Hook pour récupérer tous les Pokémon
export function useAllPokemons() {
  const { data, error, isLoading } = useSWR(
    "all-pokemons",
    fetchAllPokemonsWithSWR,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // Cache pendant 5 minutes
    },
  );

  return {
    pokemons: data || [],
    isLoading,
    error,
  };
}

// Fonction pour récupérer tous les Pokémon (utilisée par SWR)
async function fetchAllPokemonsWithSWR(): Promise<Pokemon[]> {
  try {
    const totalToFetch = 151;
    const batchSize = 20;
    const allPokemons: Pokemon[] = [];

    // Faire plusieurs appels avec limit=20 maximum
    for (let offset = 0; offset < totalToFetch; offset += batchSize) {
      const limit = Math.min(batchSize, totalToFetch - offset);
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      const data = await fetcher(url);

      const detailedPokemons: Pokemon[] = await Promise.all(
        data.results.map(async (poke: { name: string; url: string }) => {
          const details = await fetcher(poke.url);
          return {
            name: poke.name,
            url: poke.url,
            types: details.types,
            weight: details.weight,
            height: details.height,
            sprites: { front_default: details.sprites.front_default },
            id: details.id,
          };
        }),
      );

      allPokemons.push(...detailedPokemons);
    }

    return allPokemons;
  } catch (error) {
    console.error("Error fetching all pokemons:", error);
    throw error;
  }
}
