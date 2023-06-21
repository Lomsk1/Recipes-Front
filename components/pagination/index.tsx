// import { getRecipeForPagination } from "@/API/receipt/action";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
import RecipeContainerSquare from "../recipeContainer/square";
import ButtonsForPagination from "./buttons";

interface PaginationRecipesTypes {
  recipeStats: {
    status: string;
    total: number;
    stats: {
      numRecipes: number;
    }[];
  };
  recipes: {
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
  limit: number;
  page: number;
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

function PaginationRecipe({
  recipeStats,
  recipes,
  limit,
  page,
}: PaginationRecipesTypes) {
  return (
    <main className="pagination_recipe">
      {/* Display the current page items */}
      <article>
        {recipes &&
          recipes.data.map((item) => (
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
        <ButtonsForPagination
          totalRecipes={recipeStats.total}
          limit={limit}
          page={page}
        />
      </footer>
    </main>
  );
}

export default PaginationRecipe;
