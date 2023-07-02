import AddButton from "@/components/addButton";
import PopupForm from "@/components/popup/form";
import PopupMiddle from "@/components/popup/middle";
import { IngredientCategoryTypes } from "@/components/types/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  category: string;
}

function IngredientAddForm({
  ingredientData,
  categoryData,
}: {
  ingredientData: Function;
  categoryData: IngredientCategoryTypes;
}) {
  const [addFormIsOpen, setAddFormIsOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = Cookies.get("jwt");
    const update = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredient`,
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
        "შეცდომა მოხდა კატეგორიის დამატებისას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    setStatusMessage("კატეგორია წარმატებით დაემატა!");
    ingredientData();
    reset();
  };
  return (
    <>
      <AddButton
        name="ინგრედიენტის დამატება"
        addFunction={() => setAddFormIsOpen(true)}
      />

      {addFormIsOpen && (
        <PopupForm closeFunction={() => setAddFormIsOpen(false)}>
          {categoryData.status === "success" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="კატეგორიის სახელი "
                {...register("name")}
              />
              <select {...register("category")}>
                {categoryData.data.map((data) => (
                  <option value={data._id} key={data._id}>
                    {data.name}
                  </option>
                ))}
              </select>
              <button type="submit">დამატება</button>
            </form>
          )}
        </PopupForm>
      )}

      {statusMessage && (
        <PopupMiddle
          statusResponse={statusMessage}
          buttonName="დახურვა"
          buttonFunction={() => {
            setStatusMessage(null);
          }}
        />
      )}
    </>
  );
}

export default IngredientAddForm;
