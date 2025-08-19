import useSWR from "swr";

// Fetcher function pour SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
};

// Hook pour récupérer les détails d'un Pokémon avec ses moves
export function usePokemonDetails(pokemonId: number | null) {
  const cacheKey = pokemonId ? `pokemon-details-${pokemonId}` : null;

  const { data, error, isLoading } = useSWR(
    cacheKey,
    () => fetchPokemonDetails(pokemonId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
    },
  );

  return {
    moves: data?.moves || [],
    isLoading,
    error,
  };
}

async function fetchPokemonDetails(pokemonId: number) {
  try {
    const pokemonData = await fetcher(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );

    // Récupérer les détails des moves
    type EffectEntry = {
      effect: string;
      language: { name: string };
    };

    type MoveInfo = {
      move: {
        name: string;
        url: string;
      };
    };

    const movePromises = pokemonData.moves.map(async (moveInfo: MoveInfo) => {
      const moveData = await fetcher(moveInfo.move.url);
      const description =
        moveData.effect_entries.find(
          (entry: EffectEntry) => entry.language.name === "en",
        )?.effect || "No description available";

      return {
        name: moveInfo.move.name,
        url: moveInfo.move.url,
        description,
      };
    });

    const moves = await Promise.all(movePromises);

    return { moves };
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    throw error;
  }
}
