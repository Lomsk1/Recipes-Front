"use client";

import Image from "next/image";
import heartEmptyIcon from "../../assets/svg/heartEmpty.svg";
import linkIcon from "../../assets/svg/export.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSideRecipeToggle } from "@/redux/client/receipts/slice";
import { getRecipeById } from "@/API/receipt/action";

interface ReduxTypes {
  sideRecipeIsOpen: boolean;
}
interface PropsTypes {
  image: {
    name: string;
    destination: string;
  };
  title: string;
  cookingTime: string;
  ingredientsLength: number;
  id: string;
}

function RecipeBox({
  image,
  title,
  cookingTime,
  ingredientsLength,
  id,
}: PropsTypes) {
  const redux: ReduxTypes = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  return (
    <div className="receipt_box">
      {/* Image */}
      <div className="image">
        <Image
          src={`${process.env.NEXT_PUBLIC_DB_HOST}/${image.destination}/${image.name}`}
          alt={title}
          width={100}
          height={100}
        />
      </div>
      {/* Information */}
      <div className="information">
        <h4
          onClick={() => {
            dispatch(setSideRecipeToggle(!redux.sideRecipeIsOpen));
            dispatch(getRecipeById({ id: id }));
          }}
        >
          {title}
        </h4>
        <p>
          მომზადების დრო: <span>{cookingTime}</span>
        </p>
        <p>
          საჭირო ინგრედიენტების რაოდენობა: <span>{ingredientsLength}</span>
        </p>
      </div>
      {/* Actions */}
      <div className="actions">
        <button>
          <Image src={heartEmptyIcon} alt="heart" width={15} height={15} />
        </button>
        <button>
          <Image src={linkIcon} alt="heart" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default RecipeBox;
