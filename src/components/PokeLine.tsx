import { useState } from "react";
import type { Pokemon } from "../types/Pokemon";
import { typeColors } from "./typeColors";
import PokemonModal from "./PokemonModal";

type PokeLineProps = {
  pokemons: Pokemon[];
};

export default function PokeLine({ pokemons }: PokeLineProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <>
      <div className="flex justify-center gap-4 row w-[90%]">
        {pokemons
          .filter((pokemon) => pokemon.id <= 151)
          .map((pokemon, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg p-4 max-w-[250px]"
              style={{ width: "25%" }}
            >
              <h3 className="text-center text-white font-bold">
                {pokemon.name}
              </h3>
              <img
                className="w-full h-auto border-4 border-gray-800 rounded"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <h3 className="text-sm text-white text-center mt-1">
                Weight: {pokemon.weight}
              </h3>
              <h3 className="text-sm text-white text-center mt-1">
                Height: {pokemon.height}
              </h3>
              {pokemon.types && (
                <div className="flex justify-center gap-2 mt-1">
                  {pokemon.types.map((t) => (
                    <span
                      key={t.type.name}
                      style={{
                        backgroundColor: typeColors[t.type.name] || "#ccc",
                        color: "#fff",
                        borderRadius: "0.5rem",
                        padding: "0.2rem 0.7rem",
                        fontWeight: 600,
                        fontSize: "0.9em",
                      }}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => handleOpenModal(pokemon)}
                className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
              >
                Voir plus
              </button>
            </div>
          ))}
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
