"use client";

import PopupForm from "@/components/popup/form";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import PopupMiddle from "@/components/popup/middle";
import { ReactEventHandler, useState } from "react";

type FormValues = {
  name: string;
};

function IngredientCategoryChangeForm({
  id,
  getData,
  closeFunction,
}: {
  id: string;
  getData: Function;
  closeFunction: ReactEventHandler;
}) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = Cookies.get("jwt");
    const update = await axios.patch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredientCategory/${id}`,
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
        "შეცდომა მოხდა კატეგორიის ცვლილებისას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    setStatusMessage("კატეგორია წარმატებით შეიცვალა!");
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
            placeholder="კატეგორიის სახელი"
          />
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

export default IngredientCategoryChangeForm;
