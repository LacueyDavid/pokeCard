import { useState } from "react";
import Pagination from "./components/Pagination";
import "./App.css";
import PokeCards from "./components/PokeCards";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 20;
  const pageSize = 8;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark gap-16">
      <PokeCards currentPage={currentPage} pageSize={pageSize} />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
