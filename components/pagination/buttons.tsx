"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ForTypes {
  totalRecipes: number;
  limit: number;
  page: number;
}

function ButtonsForPagination({ totalRecipes, limit, page }: ForTypes) {
  const [currentPage, setCurrentPage] = useState(page);

  //   const endOffset = itemOffset + limit;
  const router = useRouter();

  const totalPages = Math.ceil(totalRecipes / limit);

  //   const handlePageClick = (event: { selected: number }) => {
  //     setCurrentPage(event.selected);
  //     const pageQueryParam = event.selected + 1;
  //     const limitQueryParam = limit;
  //     router.push(
  //       `/all-receipts?page=${pageQueryParam}&limit=${limitQueryParam}`
  //     );
  //   };
  // // Handle page change
  const handlePageChange = (PrevPage: number) => {
    if (limit) {
      router.push(`/all-receipts?page=${PrevPage}&limit=${limit}`);
    }
  };
  return (
    <>
      {page > 1 && (
        <button onClick={() => handlePageChange(page - 1)}>წინა</button>
      )}

      {totalRecipes &&
        Array.from({ length: totalPages }, (_, index) => {
          // Display a range of page numbers with ellipsis
          const currentPage = index + 1;
          const showPage =
            currentPage === page ||
            currentPage === 1 ||
            currentPage === totalPages ||
            (currentPage >= page - 1 && currentPage <= page + 1);

          if (!showPage) {
            return <span key={currentPage} className="ellipsis"></span>;
          }

          return (
            <button
              key={currentPage}
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === page}
            >
              {currentPage}
            </button>
          );
        })}

      {page < totalPages && (
        <button onClick={() => handlePageChange(page + 1)}>შემდეგი</button>
      )}
    </>
  );
}

export default ButtonsForPagination;
