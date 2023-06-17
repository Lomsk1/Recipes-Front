"use client";

import { getRecipeForPagination } from "@/API/receipt/action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RecipeContainerSquare from "../recipeContainer/square";

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

  return (
    <main className="pagination_recipe">
      {/* Display the current page items */}
      <article>
        {!paginationIsLoading &&
          recipesForPagination.data.map((item) => (
            <RecipeContainerSquare
              key={item._id}
              cookingTime={item.cookingTime}
              name={item.name}
              imageUrl={item.image.url}
              difficulty={item.difficulty}
              id={item._id}
            />
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
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={page === index + 1}
            >
              {index + 1}
            </button>
          ))}

        {/* Render next page button if not on the last page */}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)}>შემდეგი</button>
        )}
      </footer>
    </main>
  );
}

export default PaginationRecipe;
