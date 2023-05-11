"use client";
import closeIcon from "../../assets/svg/delete.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIngredients } from "@/redux/client/ingredients/slice";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useState } from "react";
import { setFilteredRecipe } from "@/redux/client/receipts/slice";
import { getAllFilteredRecipe } from "@/API/receipt/action";
import { IngredientsType, RecipeTypes } from "../types/types";

function ChosenInformation() {
  const [recipeAmount, setRecipeAmount] = useState<number>(0);

  const dispatch = useAppDispatch();
  const redux: any = useAppSelector((state) => state.ingredientClient);
  const recipeFilteredApi: any = useAppSelector((state) => state.recipe);

  const { handleSubmit } = useForm<any>();
  const onSubmitAllRecipes: SubmitHandler<any> = (data) => {
    let idArr: string[] = [];
    redux.ingredients.forEach((value: any) => {
      idArr.push(value._id);
    });
    dispatch(
      getAllFilteredRecipe({
        id: idArr,
      })
    )
      .unwrap()
      .then((val: any) => {
        setRecipeAmount(val.result);
        // localStorage.setItem("receipts", JSON.stringify(val.data));
        dispatch(setFilteredRecipe(val.data));
      })
      .catch((err: Error) => console.log(err));
  };

  return (
    <section className="chosen_information">
      {/* Chosen Ingredients */}
      <div className="chosen_ingredients">
        <h2>თქვენ აირჩიეთ შემდეგი ინგრედიენტები</h2>
        <aside>
          {/* Ingredients */}
          {redux && redux.ingredients.length > 0 ? (
            redux.ingredients.map((data: IngredientsType) => (
              <div key={data._id}>
                <p>{data.name}</p>
                <button
                  onClick={() => {
                    let ingredients = localStorage.getItem("ingredients");
                    let ingredientsArr = ingredients
                      ? JSON.parse(ingredients)
                      : [];

                    ingredientsArr = ingredientsArr.filter(
                      (i: any) => i._id !== data._id
                    );
                    dispatch(setIngredients(ingredientsArr));
                    localStorage.setItem(
                      "ingredients",
                      JSON.stringify(ingredientsArr)
                    );
                  }}
                >
                  <Image src={closeIcon} alt="close"></Image>
                </button>
              </div>
            ))
          ) : (
            <p className="p_white">ინგრედიენტი არჩეული არ არის</p>
          )}
        </aside>
      </div>

      {/* How many Dishes are there */}

      <form
        onSubmit={handleSubmit(onSubmitAllRecipes)}
        className="amount_of_dishes"
      >
        <button type="submit">რეცეპტის მოძებნა</button>
        <hr />
        <h2>
          ნაპოვნია <span>{recipeAmount}</span> რეცეპტი
        </h2>
      </form>

      {/* Chosen Category */}

      <div className="chosen_category">
        <h2>შემოთავაზებული კატეგორიები</h2>
        <aside>
          {recipeFilteredApi &&
            recipeFilteredApi.filteredRecipe &&
            recipeFilteredApi.filteredRecipe.map((data: RecipeTypes) => (
              <div key={data._id}>
                <p>{data.recipeCategory.name}</p>
              </div>
            ))}
        </aside>
      </div>
    </section>
  );
}

export default ChosenInformation;
