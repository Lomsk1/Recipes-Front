"use client";

import ChosenInformation from "@/components/byIngredients/chosenInformation";
import MainPageHeader from "@/components/navigation/header";
import ReceiptsBox from "@/components/byIngredients/receipts";
import SidebarBurger from "@/components/sidebar/burger";
import ReceptSide from "@/components/sideRecept";
import { setSideRecipeToggle } from "@/redux/client/receipts/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import emptyStateImage from "../../assets/images/emptyYellow.png";
import Image from "next/image";
import Cookies from "js-cookie";

async function getUserData() {
  const token = Cookies.get("jwt") || null;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!result.ok) return null;

  return result.json();
}

export default function ChooseIngredients() {
  const [userFetch, setUserFetch] = useState<any>(null);

  const redux: any = useAppSelector((state) => state.recipe);
  const recipeApi: any = useAppSelector((state) => state.recipeAPI);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const handleClickOutside = () => {
    dispatch(setSideRecipeToggle(false));
  };

  useOnClickOutside(ref, handleClickOutside);

  // User & Favorite

  useEffect(() => {
    if (Cookies.get("jwt")) {
      const userData = async () => {
        const data = await getUserData();
        setUserFetch(data);
      };

      if (userData) userData();
    }
  }, []);

  const handlerUserFunction = async () => {
    const data = await getUserData();
    setUserFetch(data);
  };
  return (
    <main className="main_page">
      {/* Header && NAvigation */}
      <MainPageHeader userData={userFetch} />

      {/* User Choose Information */}
      <ChosenInformation />

      {/* Recipes */}

      <section className="receipts_container">
        {redux && redux.filteredRecipe.length > 0 ? (
          redux.filteredRecipe.map((data: any) => (
            <ReceiptsBox
              key={data._id}
              title={data.name}
              cookingTime={data.cookingTime}
              images={data.image}
              ingredientsLength={data.ingredients.length}
              id={data._id}
              userData={userFetch}
              userFunction={() => handlerUserFunction()}
            />
          ))
        ) : (
          <div className="zero_info">
            <Image src={emptyStateImage} alt="empty" width={70} height={70} />

            <p>რეცეპტი ვერ მოიძებნა</p>
          </div>
        )}
      </section>

      {/* Side Detailed Recept */}
      <section
        className="receipt_side_detailed"
        style={{
          right: redux.sideRecipeIsOpen ? "0" : "-100%",
        }}
        ref={ref}
      >
        {recipeApi && recipeApi.receptDataById.status === "success" ? (
          <ReceptSide
            _id={recipeApi.receptDataById.data._id}
            name={recipeApi.receptDataById.data.name}
            cookingTime={recipeApi.receptDataById.data.cookingTime}
            ingredients={recipeApi.receptDataById.data.ingredients}
            image={recipeApi.receptDataById.data.image}
            nutrition={recipeApi.receptDataById.data.nutrition}
            ratingsAverage={recipeApi.receptDataById.data.ratingsAverage}
            ratingsQuantity={recipeApi.receptDataById.data.ratingsQuantity}
            userData={userFetch}
            userFunction={() => handlerUserFunction()}
          />
        ) : (
          <div></div>
        )}
      </section>
      {/* Burger bar */}
      <SidebarBurger />
    </main>
  );
}
