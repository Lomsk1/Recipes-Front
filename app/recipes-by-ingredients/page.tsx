"use client";

import ChosenInformation from "@/components/byIngredients/chosenInformation";
import MainPageHeader from "@/components/navigation/header";
import ReceiptsBox from "@/components/byIngredients/receipts";
import SidebarBurger from "@/components/sidebar/burger";
import MainSideBar from "@/components/sidebar/main";
import ReceptSide from "@/components/sideRecept";
import { setSideRecipeToggle } from "@/redux/client/receipts/slice";
import { setSidebarToggle } from "@/redux/client/sidebar/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import emptyStateImage from "../../assets/images/emptyYellow.png";
import Image from "next/image";

export default function ChooseIngredients() {
  const redux: any = useAppSelector((state) => state.recipe);
  const recipeApi: any = useAppSelector((state) => state.recipeAPI);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const handleClickOutside = () => {
    dispatch(setSideRecipeToggle(false));
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <main className="main_page">
      {/* Header && NAvigation */}
      <MainPageHeader />

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
              image={data.image}
              ingredientsLength={data.ingredients.length}
              id={data._id}
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
          right:
            // recipeApi.receptDataById &&
            // recipeApi.receptDataById.length > 0 &&
            redux.sideRecipeIsOpen ? "0" : "-100%",
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
          />
        ) : (
          <div>loading...</div>
        )}
      </section>
      {/* Burger bar */}
      <SidebarBurger />
    </main>
  );
}
