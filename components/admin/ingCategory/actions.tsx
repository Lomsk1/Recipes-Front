"use client";

import PopupMiddle from "@/components/popup/middle";
import Table from "@/components/table/table";
import { IngredientCategoryTypes } from "@/components/types/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IngredientCategoryAddForm from "./add";
import IngredientCategoryChangeForm from "./changeForm";

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

function IngredientCategoryTable({}: //   data,
{
  //   data: IngredientCategoryTypes["data"];
}) {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [ingredientData, setIngredientData] =
    useState<IngredientCategoryTypes | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [changeID, setChangeID] = useState<string | null>(null);

  const getData = async () => {
    setIngredientData(await getIngredientCategoryData());
  };

  useEffect(() => {
    getData();
    setDomLoaded(true);
  }, []);

  const deleteIngCategory = async (id: string) => {
    const token = Cookies.get("jwt");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredientCategory/${id}`,
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
          <IngredientCategoryAddForm getData={() => getData()} />
          {/* Table */}
          {ingredientData?.status === "success" && (
            <Table
              header={["სახელი"]}
              data={ingredientData.data}
              deleteHandler={deleteIngCategory}
              changeHandler={changeIngCategory}
            />
          )}

          {/* Change Form */}
          {changeOpen && changeID && (
            <IngredientCategoryChangeForm
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

export default IngredientCategoryTable;
