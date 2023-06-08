"use client";

import { getRecipeById } from "@/API/receipt/action";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";

interface RecipeTypes {
  image: {
    url: string;
  };
  name: string;
  _id: string;
}

function RecipesWithDetails({ image, name, _id }: RecipeTypes) {
  const dispatch = useAppDispatch();
  return (
    <div className="recipe_with_details">
      <header>
        <Image src={image.url} alt="image" width={50} height={50} />
      </header>
      <main>
        <h3>{name}</h3>
        <button onClick={() => dispatch(getRecipeById({ id: _id }))}>
          დეტალურად
        </button>
      </main>
    </div>
  );
}

export default RecipesWithDetails;
