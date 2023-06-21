"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ForTypes {
  totalRecipes: number;
  limit: number;
  page: number;
}

function ButtonsForPagination({ totalRecipes, limit, page }: ForTypes) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const router = useRouter();

  /* Calculate the total number of pages */
  const totalPages = Math.ceil(totalRecipes / limit);

  /* Handle page change */
  const handlePageChange = (PrevPage: number) => {
    if (limit) {
      router.push(`/all-receipts?page=${PrevPage}&limit=${limit}`);
    }
  };

  return (
    <>
      {domLoaded && (
        <>
          {/* Render previous page button if not on the first page */}
          {page > 1 && (
            <button onClick={() => handlePageChange(page - 1)}>&#8249;</button>
          )}

          {/* Render page buttons */}
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
                return <div key={currentPage} className="ellipsis"></div>;
              }

              return (
                <button
                  className="but"
                  key={currentPage}
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === page}
                >
                  {currentPage}
                </button>
              );
            })}

          {/* Render next page button if not on the last page */}
          {page < totalPages && (
            <button onClick={() => handlePageChange(page + 1)}>&#8250;</button>
          )}
        </>
      )}
    </>
  );
}

export default ButtonsForPagination;
