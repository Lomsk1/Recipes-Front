"use client";

import Image from "next/image";
import searchIcon from "../../assets/icons/search-white.png";
import SidebarIngredientBox from "../sidebarBox";
import vegetableBg from "../../assets/images/vegetables-pattern-logo-3F32CE0653-seeklogo.com.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useState } from "react";
import { getAllIngredientCategory } from "@/API/ingCategory/action";
import SkeletonForSidebar from "../skeletons/forSidebar";
import WrapperContainer from "../wrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { getIngredientsBySearch } from "@/API/ingredient/action";
import { setIngredients } from "@/redux/client/ingredients/slice";

interface CategoryTypes {
  _id: string;
  name: string;
  ingredients: {
    name: string;
    _id: string;
  }[];
}

interface FormValues {
  name: string;
}
interface SearchTypes {
  ingredientSearchData: {
    status: string;
    result: number;
    data: {
      _id: string;
      name: string;
    }[];
  };
  searchIsLoading: boolean;
}

function MainSideBar() {
  const redux: any = useAppSelector((state) => state.sidebar);
  const reduxIngredient: any = useAppSelector(
    (state) => state.ingredientClient
  );

  let { ingredientSearchData, searchIsLoading }: SearchTypes = useAppSelector(
    (state) => state.ingredientApi
  );

  const dispatch = useAppDispatch();
  const { categoryData, isLoading }: any = useAppSelector(
    (state) => state.ingredientCategory
  );

  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    memoizedDispatch(getAllIngredientCategory());
  }, [memoizedDispatch]);

  /* Search Functions */
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const searchHandler = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  const { handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    dispatch(
      getIngredientsBySearch({
        ingredient: data.name,
      })
    );

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    setSearchIsOpen(true);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    const checked = e.target.checked;
    const id = e.target.id.slice(1);
    let ingredients = localStorage.getItem("ingredients");
    let ingredientsArr = ingredients ? JSON.parse(ingredients) : [];
    if (checked) {
      ingredientsArr.push(data);
    } else {
      ingredientsArr = ingredientsArr.filter((i: any) => i._id !== id);
    }

    localStorage.setItem("ingredients", JSON.stringify(ingredientsArr));
    dispatch(setIngredients(ingredientsArr));
  };

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

        {/* Search Form */}
        <form className="sidebar_search_form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="search"
            name="name"
            onFocus={() => setSearchIsOpen(true)}
            placeholder="ჩაწერეთ ინგრედიენტის სახელი"
            onChange={handleInputChange}
            required={true}
          />
          <button type="submit">
            <Image src={searchIcon} alt="search" />
          </button>

          {/* Wrapper */}
          <WrapperContainer visible={searchIsOpen} close={searchHandler}>
            {!searchIsLoading ? (
              ingredientSearchData.status === "success" &&
              ingredientSearchData.data.length > 0 ? (
                ingredientSearchData.data.map((data) => (
                  <div
                    className="ingredientBox"
                    key={data._id}
                    style={{
                      backgroundColor: reduxIngredient.ingredients
                        .map((id: any) => id._id)
                        .includes(data._id)
                        ? "#db3a34"
                        : "",
                    }}
                  >
                    <input
                      type="checkBox"
                      id={`${data._id}`}
                      checked={reduxIngredient.ingredients
                        .map((id: any) => id._id)
                        .includes(data._id)}
                      onChange={(e) => {
                        inputHandler(e, data);
                      }}
                    />
                    <label htmlFor={`${data._id}`}>{data.name}</label>
                  </div>
                ))
              ) : (
                <div className="ingredient_loading_text">
                  ინგრედიენტი ვერ მოიძებნა
                </div>
              )
            ) : (
              <div className="ingredient_loading_text">
                გთხოვთ შეიყვანოთ ინგრედიენტის სახელი
              </div>
            )}
          </WrapperContainer>
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
