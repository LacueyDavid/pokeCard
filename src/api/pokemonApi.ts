import type { Pokemon } from "../types/Pokemon";

export async function fetchPokemons(
  page: number,
  pageSize: number,
): Promise<Pokemon[]> {
  try {
    const offset = (page - 1) * pageSize;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();

    // Pour chaque Pokémon, fetch ses détails pour avoir le sprite
    const detailedPokemons: Pokemon[] = await Promise.all(
      data.results.map(async (poke: { name: string; url: string }) => {
        const res = await fetch(poke.url);
        const details = await res.json();
        return {
          name: poke.name,
          url: poke.url,
          sprites: { front_default: details.sprites.front_default }
        };
      })
    );

    return detailedPokemons;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
}
