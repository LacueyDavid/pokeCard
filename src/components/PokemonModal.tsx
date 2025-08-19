import type { Pokemon } from "../types/Pokemon";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

type PokemonModalProps = {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
};

export default function PokemonModal({
  pokemon,
  isOpen,
  onClose,
}: PokemonModalProps) {
  const { moves, isLoading, error } = usePokemonDetails(isOpen ? pokemon.id : null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold capitalize text-white">
              {pokemon.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-white">Moves Possibles</h3>
            {isLoading && (
              <p className="text-gray-300">Chargement des moves...</p>
            )}
            {error && (
              <p className="text-red-400">Erreur lors du chargement des moves</p>
            )}
            {!isLoading && !error && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {moves.map((move, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 bg-gray-800 p-3 rounded">
                    <h4 className="font-semibold capitalize text-blue-400">
                      {move.name.replace('-', ' ')}
                    </h4>
                    <p className="text-sm text-gray-300 mt-1">
                      {move.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
