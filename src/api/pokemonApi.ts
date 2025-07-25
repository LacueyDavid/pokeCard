export async function fetchPokemons(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error while loading pokemons");
  return response.json();
}
