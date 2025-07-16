import { useState } from "react";
import Pagination from "./components/Pagination";
import PokeCard from "./components/PokeCard";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 3;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark gap-4">
      <PokeCard />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
