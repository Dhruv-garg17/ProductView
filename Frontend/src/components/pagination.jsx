import React from "react";
import "../styles/pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        &laquo; Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={p === currentPage ? "active-page" : ""}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
