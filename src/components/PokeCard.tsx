export default function PokeCard() {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white max-w-xs mx-auto">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="Pikachu"
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-bold text-center mt-2">Pikachu</h2>
      <p className="text-center text-gray-600">Type: Electric</p>
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Height:</span> 0.4 m
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Weight:</span> 6.0 kg
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Abilities:</span> Static, Lightning
          Rod
        </p>
      </div>
    </div>
  );
}
