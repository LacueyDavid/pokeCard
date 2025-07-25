import PageLink from "./PageLink";
import "./Pagination.css";
import { getPaginationItems } from "../lib/pagination";

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: Props) {
  const pageNumber = getPaginationItems(currentPage, lastPage, maxLength);

  const handleEllipsisClick = () => {
    const input = prompt("Entrez le numéro de page désiré :");
    const page = Number(input);
    if (!isNaN(page) && page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </PageLink>
      {pageNumber.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          onClick={
            !isNaN(pageNum)
              ? () => setCurrentPage(pageNum)
              : handleEllipsisClick
          }
        >
          {!isNaN(pageNum) ? pageNum : "..."}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  );
}
