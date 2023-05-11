"use client";

import Image from "next/image";
import searchIcon from "../../assets/icons/search-white.png";
import SidebarIngredientBox from "../sidebarBox";
import vegetableBg from "../../assets/images/vegetables-pattern-logo-3F32CE0653-seeklogo.com.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAllIngredientCategory } from "@/API/ingCategory/action";
import SkeletonForSidebar from "../skeletons/forSidebar";

interface CategoryTypes {
  _id: string;
  name: string;
  ingredients: {
    name: string;
    _id: string;
  }[];
}

function MainSideBar() {
  const redux: any = useAppSelector((state) => state.sidebar);

  const dispatch = useAppDispatch();
  const { categoryData, isLoading }: any = useAppSelector(
    (state) => state.ingredientCategory
  );

  useEffect(() => {
    dispatch(getAllIngredientCategory());
  }, []);

  // useEffect(() => {
  //   console.log(categoryData);
  // }, [categoryData]);

  return (
    <section
      className="main_sidebar"
      style={{ left: redux.sidebarIsOpen ? "0" : "-100%" }}
    >
      {/* Header */}
      <header className="sidebar_navigation">
        <div className="filter">
          <Image priority src={vegetableBg} alt="vegetable"></Image>
        </div>
        <h1>საძიებო</h1>
        <form className="sidebar_search_form">
          <input
            type="search"
            name=""
            id=""
            placeholder="ჩაწერეთ ინგრედიენტის სახელი"
          />
          <button type="submit">
            <Image src={searchIcon} alt="search" />
          </button>
        </form>
      </header>

      {/* Ingredients */}
      <main className="ingredients">
        {!isLoading ? (
          categoryData &&
          categoryData.data.map((data: CategoryTypes) => (
            <SidebarIngredientBox
              key={data._id}
              title={data.name}
              amount={data.ingredients.length}
              ingredientData={data.ingredients}
            />
          ))
        ) : (
          <SkeletonForSidebar />
        )}
      </main>
    </section>
  );
}

export default MainSideBar;
