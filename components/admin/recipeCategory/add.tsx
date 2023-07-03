import AddButton from "@/components/addButton";
import PopupForm from "@/components/popup/form";
import PopupMiddle from "@/components/popup/middle";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
}

function RecipeCategoryAddForm({ getData }: { getData: Function }) {
  const [addFormIsOpen, setAddFormIsOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = Cookies.get("jwt");
    const update = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipeCategory`,
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
    getData();
    reset();
  };
  return (
    <>
      <AddButton
        name="კატეგორიის დამატება"
        addFunction={() => setAddFormIsOpen(true)}
      />

      {addFormIsOpen && (
        <PopupForm closeFunction={() => setAddFormIsOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="კატეგორიის სახელი "
              {...register("name")}
            />
            <button type="submit">დამატება</button>
          </form>
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

export default RecipeCategoryAddForm;
