"use client";

import Image from "next/image";
import testImage from "../../assets/images/test.jpg";
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

interface RecipeProps
  extends Omit<
    RecipeTypes,
    | "recipeCategory"
    | "author"
    | "cookingProcess"
    | "createdAt"
    | "difficulty"
    | "shortDescription"
  > {}

function ReceptSide({
  image,
  name,
  cookingTime,
  ingredients,
  _id,
  nutrition,
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
          src={`${process.env.NEXT_PUBLIC_DB_HOST}/${image.destination}/${image.name}`}
          alt={name}
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
            <h3>{name}</h3>
            <button>
              <Image src={heartEmptyIcon} alt="heart" width={15} height={15} />
            </button>
          </aside>
          <hr />
          {/* Review & Time */}
          <div className="rew_time">
            <ReviewComponent />
            <div className="time">
              <Image src={clockIcon} alt="heart" width={15} height={15} />
              <p>{cookingTime}</p>
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
                <p>{data.name}</p>
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
                <p>{data.name}</p>
                <span>{data.weight} კალორია</span>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default ReceptSide;
