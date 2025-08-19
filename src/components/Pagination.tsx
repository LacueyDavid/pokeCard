import { useEffect, useRef } from "react";
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

  // BroadcastChannel pour sync pagination
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("pokemon-pagination");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      console.log("📥 PAGINATION reçu:", event.data);
      if (event.data.type === "PAGE_UPDATE") {
        setCurrentPage(event.data.payload);
      }
    };

    return () => channel.close();
  }, [setCurrentPage]);

  // Handler pour broadcaster les changements de page
  const handlePageChange = (page: number) => {
    console.log("📤 PAGINATION envoi page:", page);
    setCurrentPage(page);

    if (channelRef.current) {
      channelRef.current.postMessage({
        type: "PAGE_UPDATE",
        payload: page,
      });
    }
  };

  const handleEllipsisClick = () => {
    const input = prompt("Entrez le numéro de page désiré :");
    const page = Number(input);
    if (!isNaN(page) && page >= 1 && page <= lastPage) {
      handlePageChange(page);
    }
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </PageLink>
      {pageNumber.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          onClick={
            !isNaN(pageNum)
              ? () => handlePageChange(pageNum)
              : handleEllipsisClick
          }
        >
          {!isNaN(pageNum) ? pageNum : "..."}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  );
}
