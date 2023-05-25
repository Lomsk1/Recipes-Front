"use client";

import Image from "next/image";
import heartEmptyIcon from "../../assets/svg/heartEmpty.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import ReviewComponent from "../review";
import clockIcon from "../../assets/svg/alarm-clock.svg";
import closeIcon from "../../assets/svg/delete.svg";
import checkIcon from "../../assets/svg/circle-check-solid.svg";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { setSideRecipeToggle } from "@/redux/client/receipts/slice";
import { RecipeTypes } from "../types/types";
import {
  createRecipeFavorite,
  deleteRecipeFavoriteApi,
} from "@/API/recipeFavorite/action";

interface RecipeProps
  extends Omit<
    RecipeTypes,
    | "recipeCategory"
    | "author"
    | "cookingProcess"
    | "createdAt"
    | "difficulty"
    | "shortDescription"
    | "like"
    | "necessaryIngredients"
    | "portion"
  > {
  userData: {
    data: {
      recipe: string;
      _id: string;
      favorites: {
        _id: string;
        recipe: string;
      }[];
    };
  };
  userFunction: Function;
}

function ReceptSide({
  image,
  name,
  cookingTime,
  ingredients,
  _id,
  nutrition,
  ratingsAverage,
  ratingsQuantity,
  userData,
  userFunction,
}: RecipeProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="side_receipts_box">
      {/* Close */}
      <button
        className="close"
        onClick={() => dispatch(setSideRecipeToggle(false))}
      >
        <Image src={closeIcon} alt="close" width={40} height={40}></Image>
      </button>
      {/* Image */}
      <div className="image">
        <Image
          src={`${image.url}`}
          alt={name ? name : "სურათი"}
          width={100}
          height={100}
        />
      </div>
      {/* Information */}
      <div className="information">
        {/* Header */}
        <header>
          <aside>
            {/* Title */}
            <h3>{name && name}</h3>
            {userData &&
            userData.data.favorites
              .map((data: { recipe: string }) => data.recipe)
              .includes(_id) ? (
              <button
                onClick={() =>
                  dispatch(
                    deleteRecipeFavoriteApi({
                      userId: userData.data._id,
                      recipeId: _id,
                    })
                  )
                    .unwrap()
                    .then(() => userFunction())
                }
              >
                <Image src={heartFullIcon} alt="heart" width={15} height={15} />
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch(
                    createRecipeFavorite({
                      user: userData.data._id,
                      recipeID: _id,
                    })
                  )
                    .unwrap()
                    .then(() => userFunction())
                }
              >
                <Image
                  src={heartEmptyIcon}
                  alt="heart"
                  width={15}
                  height={15}
                />
              </button>
            )}
          </aside>
          <hr />
          {/* Review & Time */}
          <div className="rew_time">
            <ReviewComponent
              ratingsAverage={ratingsAverage}
              ratingsQuantity={ratingsQuantity}
            />
            <div className="time">
              <Image src={clockIcon} alt="heart" width={15} height={15} />
              <p>{cookingTime && cookingTime}</p>
            </div>
          </div>
        </header>
        {/* ingredients */}
        <main>
          <h3>ინგრედიენტები</h3>
          {/* Each Ingredient */}
          {ingredients &&
            ingredients.map((data: { _id: string; name: string }) => (
              <div className="_ingredient" key={data._id}>
                <p>{data && data.name}</p>
                <Image src={checkIcon} alt="check" width={17} height={17} />
              </div>
            ))}
        </main>
        {/* Button for Full receipt */}
        <Link href={`/all-receipts/${_id}`} className="full_receipt">
          სრული რეცეპტის ნახვა
        </Link>
      </div>

      {/* Nutrition Facts */}
      <div className="nutrition_facts">
        <h3>საკვები შემადგენლობა</h3>
        {/* Each Nutrition */}
        {nutrition &&
          nutrition.map(
            (data: { _id: string; name: string; weight: number }) => (
              <div className="_ingredient" key={data._id}>
                <p>{data && data.name}</p>
                <span>{data && data.weight} კალორია</span>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default ReceptSide;
