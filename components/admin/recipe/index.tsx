"use client";

import PopupMiddle from "@/components/popup/middle";
import Table from "@/components/table/table";
import { RecipeTypes } from "@/components/types/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
}

async function getRecipeData() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

function RecipeAdminTable() {
  /* States  */
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [recipeData, setRecipeData] = useState<RecipeTypes | null>(null);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [changeID, setChangeID] = useState<string | null>(null);

  /* Get Recipe*/
  const getData = async () => {
    setRecipeData(await getRecipeData());
  };

  useEffect(() => {
    getData();
    setDomLoaded(true);
  }, []);

  /* Delete Recipe Handler */
  const deleteRecipeByAdmin = async (id: string) => {
    const token = Cookies.get("jwt");
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe/byAdmin/${id}`,
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
        "შეცდომა მოხდა რეცეპტის წაშლილას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    setStatusMessage("რეცეპტი წარმატებით წაიშალა!");
    getData();
  };

  /* Search Functions */
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe/slug/${data.name}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status !== 200) {
      setStatusMessage(
        "შეცდომა მოხდა რეცეპტის ძებნისას, გთხოვთ სცადოთ თავიდან!"
      );
    }

    setRecipeData(result.data);

    if (result.data.result === 0) {
      setStatusMessage("რეცეპტი ვერ მოიძებნა");
    }
    reset();
  };

  return (
    <>
      {domLoaded && recipeData && (
        <>
          {/* With Search */}
          <div className="search_">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="search" {...register("name")} />
              <button type="submit">მოძებნა</button>
            </form>
          </div>

          <div className="table_container">
            {recipeData?.status === "success" && (
              <Table
                header={["სახელი", "ავტორი", "ლინკი"]}
                data={recipeData?.data}
                deleteHandler={deleteRecipeByAdmin}
              />
            )}
          </div>

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

export default RecipeAdminTable;
