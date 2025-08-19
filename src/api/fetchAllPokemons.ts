import type { Pokemon } from "../types/Pokemon";

export async function fetchAllPokemons(): Promise<Pokemon[]> {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`;
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

    return detailedPokemons;
  } catch (error) {
    console.error("Error fetching all pokemons:", error);
    return [];
  }
}
