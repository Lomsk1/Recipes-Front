"use client";

import Image from "next/image";
import heartEmptyIcon from "../../assets/svg/heartEmpty.svg";
import linkIcon from "../../assets/svg/export.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSideRecipeToggle } from "@/redux/client/receipts/slice";
import { getRecipeById } from "@/API/receipt/action";
import { useRouter } from "next/navigation";

interface ReduxTypes {
  sideRecipeIsOpen: boolean;
}
interface PropsTypes {
  image: {
    public_id: string;
    url: string;
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

  const router = useRouter();

  return (
    <div className="receipt_box">
      {/* Image */}
      <div className="image">
        <Image
          src={`${image && image.url}`}
          alt={title ? title : "სურათი"}
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
          მომზადების დრო: <span>{cookingTime && cookingTime}</span>
        </p>
        <p>
          საჭირო ინგრედიენტების რაოდენობა:{" "}
          <span>{ingredientsLength && ingredientsLength}</span>
        </p>
      </div>
      {/* Actions */}
      <div className="actions">
        <button>
          <Image src={heartEmptyIcon} alt="heart" width={15} height={15} />
        </button>
        <button onClick={() => router.push(`/all-receipts/${id}`)}>
          <Image src={linkIcon} alt="link" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default RecipeBox;
