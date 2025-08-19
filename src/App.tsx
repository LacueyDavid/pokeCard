import { useState } from "react";
import Pagination from "./components/Pagination";
import "./App.css";
import PokeCards from "./components/PokeCards";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCount, setFilteredCount] = useState(151); // Commencer avec le total
  const pageSize = 8;
  const lastPage = Math.max(1, Math.ceil(filteredCount / pageSize));

  // Reset à la page 1 quand on filtre
  const handleFilteredCountChange = (count: number) => {
    setFilteredCount(count);
    if (currentPage > Math.ceil(count / pageSize)) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-16">
      <PokeCards
        currentPage={currentPage}
        pageSize={pageSize}
        onFilteredCountChange={handleFilteredCountChange}
      />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
