"use client";

import PopupForm from "@/components/popup/form";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import PopupMiddle from "@/components/popup/middle";
import { ReactEventHandler, useState } from "react";
import { IngredientCategoryTypes } from "@/components/types/types";

type FormValues = {
  name: string;
  category: string;
};

function IngredientChangeForm({
  id,
  getData,
  closeFunction,
  categoryData,
}: {
  id: string;
  getData: Function;
  closeFunction: ReactEventHandler;
  categoryData: IngredientCategoryTypes;
}) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = Cookies.get("jwt");
    const update = await axios.patch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredient/${id}`,
      { name: data.name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (update.status !== 200) {
      setStatusMessage(
        "შეცდომა მოხდა ინგრედიენტის ცვლილებისას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    setStatusMessage("ინგრედიენტი წარმატებით შეიცვალა!");
    getData();
    reset();
  };
  return (
    <>
      <PopupForm closeFunction={closeFunction}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name")}
            placeholder="ინგრედიენტის სახელი"
          />
          <select {...register("category")}>
            {categoryData.data.map((data) => (
              <option value={data._id} key={data._id}>
                {data.name}
              </option>
            ))}
          </select>
          <button type="submit">ცვლილება</button>
        </form>

        {statusMessage && (
          <PopupMiddle
            statusResponse={statusMessage}
            buttonFunction={() => {
              setStatusMessage(null);
            }}
            buttonName="დახურვა"
          />
        )}
      </PopupForm>
    </>
  );
}

export default IngredientChangeForm;
