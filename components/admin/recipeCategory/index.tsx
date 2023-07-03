"use client";

import PopupMiddle from "@/components/popup/middle";
import Table from "@/components/table/table";
import { RecipeCategory } from "@/components/types/types";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import RecipeCategoryAddForm from "./add";
import RecipeCategoryChangeForm from "./change";

async function getRecipeCategoryData() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipeCategory`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

function RecipeCategoryTable() {
  /* Actions */
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [ingredientData, setIngredientData] = useState<RecipeCategory | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [changeID, setChangeID] = useState<string | null>(null);

  const getData = async () => {
    setIngredientData(await getRecipeCategoryData());
  };

  useEffect(() => {
    getData();
    setDomLoaded(true);
  }, []);

  const deleteCategory = async (id: string) => {
    const token = Cookies.get("jwt");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipeCategory/${id}`,
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
        "შეცდომა მოხდა კატეგორიის წაშლილას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    setStatusMessage("კატეგორია წარმატებით წაიშალა!");
    getData();
  };

  const changeIngCategory = (id: string) => {
    setChangeOpen(true);
    setChangeID(id);
  };

  return (
    <>
      {domLoaded && (
        <>
          {/* Add Button */}
          <RecipeCategoryAddForm getData={() => getData()} />
          {/* Table */}
          {ingredientData?.status === "success" && (
            <Table
              header={["სახელი"]}
              data={ingredientData?.data}
              deleteHandler={deleteCategory}
              changeHandler={changeIngCategory}
            />
          )}

          {/* Change Form */}
          {changeOpen && changeID && (
            <RecipeCategoryChangeForm
              id={changeID}
              getData={() => getData()}
              closeFunction={() => {
                setChangeOpen(false);
              }}
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

export default RecipeCategoryTable;
