"use client";

import Image from "next/image";
import heartEmptyIcon from "../../assets/svg/heartEmpty.svg";
import linkIcon from "../../assets/svg/export.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSideRecipeToggle } from "@/redux/client/receipts/slice";
import { getRecipeById } from "@/API/receipt/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createRecipeFavorite,
  deleteRecipeFavoriteApi,
} from "@/API/recipeFavorite/action";

interface ReduxTypes {
  sideRecipeIsOpen: boolean;
}
interface PropsTypes {
  images: {
    public_id: string;
    url: string;
  };
  title: string;
  cookingTime: string;
  ingredientsLength: number;
  id: string;
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

function RecipeBox({
  images,
  title,
  cookingTime,
  ingredientsLength,
  id,
  userData,
  userFunction,
}: PropsTypes) {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  const redux: ReduxTypes = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  const router = useRouter();

  // Function to handle screen size changes
  function handleScreenSizeChange() {
    setScreenSize(window.innerWidth);
  }

  // Event listener for screen size changes
  window.addEventListener("resize", handleScreenSizeChange);
  return (
    <div className="receipt_box">
      {/* Image */}
      <div className="image">
        {images && (
          <Image
            src={`${images && images.url}`}
            alt={title ? title : "სურათი"}
            width={100}
            height={100}
          />
        )}
      </div>
      {/* Information */}
      <div className="information">
        <h4
          onClick={() => {
            if (screenSize > 600) {
              dispatch(setSideRecipeToggle(!redux.sideRecipeIsOpen));
              dispatch(getRecipeById({ id: id }));
            } else {
              router.push(`/all-receipts/${id}`);
            }
          }}
        >
          {title}
        </h4>
        <p>
          მომზადების დრო: <span>{cookingTime && cookingTime}</span>
        </p>
        <p>
          საჭირო ინგრედიენტების რაოდენობა:{" "}
          <span>{ingredientsLength && ingredientsLength}</span>
        </p>
      </div>
      {/* Actions */}
      <div className="actions">
        {userData &&
        userData.data.favorites
          .map((data: { recipe: string }) => data.recipe)
          .includes(id) ? (
          <button
            onClick={() =>
              dispatch(
                deleteRecipeFavoriteApi({
                  userId: userData.data._id,
                  recipeId: id,
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
                  recipeID: id,
                })
              )
                .unwrap()
                .then(() => userFunction())
            }
          >
            <Image src={heartEmptyIcon} alt="heart" width={15} height={15} />
          </button>
        )}

        <button onClick={() => router.push(`/all-receipts/${id}`)}>
          <Image src={linkIcon} alt="link" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default RecipeBox;
