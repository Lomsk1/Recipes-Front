"use client";

import { getRecipeForPagination } from "@/API/receipt/action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RecipeContainerSquare from "../recipeContainer/square";
import Link from "next/link";

interface RecipeStatsTypes {
  recipeStats: {
    status: string;
    stats: {
      numRecipes: number;
    }[];
  };
}

interface PaginationTypes {
  paginationIsLoading: boolean;
  recipesForPagination: {
    result: number;
    status: string;
    data: {
      image: {
        url: string;
      };
      name: string;
      cookingTime: string;
      difficulty: string;
      _id: string;
    }[];
  };
}

function PaginationRecipe({ recipeStats }: RecipeStatsTypes) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));
  const navigate = useRouter();

  const [totalRecipes, setTotalRecipes] = useState(0);
  const dispatch = useAppDispatch();
  const { recipesForPagination, paginationIsLoading }: PaginationTypes =
    useAppSelector((state) => state.recipeAPI);

  useEffect(() => {
    if (recipeStats && recipeStats.status === "success")
      setTotalRecipes(
        recipeStats.stats
          .map((data) => data.numRecipes)
          .reduce((acc, cur) => acc + cur)
      );

    if (limit)
      dispatch(
        getRecipeForPagination({
          page: page,
          limit: limit,
        })
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (limit) {
      navigate.push(`/all-receipts?page=${page}&limit=${limit}`);

      dispatch(
        getRecipeForPagination({
          page: page,
          limit: limit,
        })
      );
    }
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalRecipes / limit);

  if (paginationIsLoading) {
    return <div>Loading...</div>;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <main className="pagination_recipe">
      {/* Display the current page items */}
      <article>
        {!paginationIsLoading &&
          recipesForPagination.data.map((item) => (
            // <RecipeContainerSquare
            //   key={item._id}
            //   cookingTime={item.cookingTime}
            //   name={item.name}
            //   imageUrl={item.image.url}
            //   difficulty={item.difficulty}
            //   id={item._id}
            // />
            <Link key={item._id} href={`#`}>
              qwerty
            </Link>
          ))}
      </article>

      {/* Render pagination controls */}
      <footer>
        {/* Render previous page button if not on the first page */}
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>წინა</button>
        )}

        {/* Render page numbers */}

        {!paginationIsLoading &&
          recipesForPagination.status === "success" &&
          pageNumbers.map((pageNumber, index) => {
            // Display a range of page numbers with ellipsis
            const currentPage = index + 1;
            const isFirstPage = currentPage === 1;
            const isLastPage = currentPage === totalPages;
            const isInRange =
              currentPage >= page - 1 && currentPage <= page + 1;
            const showPage = isFirstPage || isLastPage || isInRange;

            if (!showPage) {
              if (
                (index === 1 && !isInRange && page > 3) ||
                (index === totalPages - 2 &&
                  !isInRange &&
                  page < totalPages - 2)
              ) {
                return (
                  <span key={currentPage} className="ellipsis">
                    ...
                  </span>
                );
              }
              return null;
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

        {/* Render next page button if not on the last page */}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)}>შემდეგი</button>
        )}
      </footer>
    </main>
  );
}

export default PaginationRecipe;
