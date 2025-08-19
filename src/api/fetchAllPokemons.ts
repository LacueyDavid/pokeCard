import type { Pokemon } from "../types/Pokemon";

export async function fetchAllPokemons(): Promise<Pokemon[]> {
  try {
    const totalToFetch = 151;
    const batchSize = 20;
    const allPokemons: Pokemon[] = [];

    // Faire plusieurs appels avec limit=20 maximum
    for (let offset = 0; offset < totalToFetch; offset += batchSize) {
      const limit = Math.min(batchSize, totalToFetch - offset);
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();

      const detailedPokemons: Pokemon[] = await Promise.all(
        data.results.map(async (poke: { name: string; url: string }) => {
          const res = await fetch(poke.url);
          const details = await res.json();
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
    return [];
  }
}
