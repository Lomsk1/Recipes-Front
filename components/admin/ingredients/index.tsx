"use client";

import PopupMiddle from "@/components/popup/middle";
import Table from "@/components/table/table";
import {
  IngredientCategoryTypes,
  IngredientsType,
} from "@/components/types/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import IngredientAddForm from "./add";
import IngredientChangeForm from "./change";

interface FormValues {
  name: string;
}

async function getIngredientData() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredient`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}
async function getIngredientCategoryData() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredientCategory`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

function AdminIngredientsAction() {
  /* States  */
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [ingredientData, setIngredientData] = useState<IngredientsType | null>(
    null
  );
  const [ingredientCategoryData, setIngredientCategoryData] =
    useState<IngredientCategoryTypes | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [changeID, setChangeID] = useState<string | null>(null);

  /* Get Ingredient & Ingredient Category Data */
  const getData = async () => {
    setIngredientData(await getIngredientData());
  };

  const getIngCategoryData = async () => {
    setIngredientCategoryData(await getIngredientCategoryData());
  };

  useEffect(() => {
    getData();
    getIngCategoryData();
    setDomLoaded(true);
  }, []);

  /* Change ingredient Handler */

  const changeIngredient = (id: string) => {
    setChangeOpen(true);
    setChangeID(id);
  };

  /* Delete Ingredient Handler */
  const deleteIngredient = async (id: string) => {
    const token = Cookies.get("jwt");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredient/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!result.ok) {
      setStatusMessage(
        "შეცდომა მოხდა ინგრედიენტის წაშლილას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    setStatusMessage("ინგრედიენტი წარმატებით წაიშალა!");
    getData();
  };

  /* Search Functions */
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredient/search/${data.name}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status !== 200) {
      setStatusMessage(
        "შეცდომა მოხდა ინგრედიენტის ძებნისას, გთხოვთ სცადოთ თავიდან!"
      );
    }

    setIngredientData(result.data);

    if (result.data.result === 0) {
      setStatusMessage("ინგრედიენტი ვერ მოიძებნა");
    }
    reset();
  };

  return (
    <>
      {domLoaded && ingredientData && ingredientCategoryData && (
        <>
          {/* Add Ingredient */}
          <IngredientAddForm
            ingredientData={() => getData()}
            categoryData={ingredientCategoryData}
          />

          {/* With Search */}
          <div className="search_">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="search" {...register("name")} />
              <button type="submit">მოძებნა</button>
            </form>
          </div>

          <div className="table_container">
            {ingredientData?.status === "success" && (
              <Table
                header={["სახელი"]}
                data={ingredientData?.data}
                deleteHandler={deleteIngredient}
                changeHandler={changeIngredient}
              />
            )}
          </div>

          {/* Change Form */}
          {changeOpen && changeID && (
            <IngredientChangeForm
              id={changeID}
              getData={() => getData()}
              closeFunction={() => {
                setChangeOpen(false);
              }}
              categoryData={ingredientCategoryData}
            />
          )}

          {/* Status Response */}
          {statusMessage && (
            <PopupMiddle
              statusResponse={statusMessage}
              buttonFunction={() => {
                setStatusMessage(null);
              }}
              buttonName="დახურვა"
            />
          )}
        </>
      )}
    </>
  );
}

export default AdminIngredientsAction;
