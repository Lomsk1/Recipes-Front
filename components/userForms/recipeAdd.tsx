"use client";

import { createRecipe } from "@/API/receipt/action";
import { useAppDispatch } from "@/store/hooks";
import { ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoadingAnimation from "../loading/loading";
import PopupMiddle from "../popup/middle";

type FormValues = {
  name: string;
  shortDescription: string;
  difficulty: string;
  cookingTime: string;
  portion: number;
  nutrition: {
    name: string;
    weight: number;
  }[];
  cookingProcess: {
    step: number;
    description: string;
  }[];
  necessaryIngredients: {
    name: string;
  }[];
  image: any;
  recipeCategory: string;
  ingredients: string[];
};

function RecipeAddForm({
  ingredients,
  recipeCategory,
  userID,
}: {
  ingredients: {
    status: string;
    result: number;
    data: {
      _id: string;
      name: string;
    }[];
  };
  recipeCategory: {
    status: string;
    result: number;
    data: {
      _id: string;
      name: string;
    }[];
  };
  userID: string;
}) {
  /* States */
  const [nutritionFields, setNutritionFields] = useState<any>([]);
  const [cookingProcessFields, setCookingProcessFields] = useState<any>([]);
  const [necessaryFields, setNecessaryFields] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popupShowGoodResponse, setPopupShowGoodResponse] =
    useState<boolean>(false);
  const [popupShowBadResponse, setPopupShowBedResponse] =
    useState<boolean>(false);

  /* Redux Components */
  const dispatch = useAppDispatch();

  /* Object Fields Functions */

  /* For Nutrition */
  const handleAddNutritionField = () => {
    setNutritionFields((prevFields: any) => [
      ...prevFields,
      { name: "", weight: 0 },
    ]);
  };
  const handleDeleteLastNutritionField = () => {
    setNutritionFields((prevFields: any) => prevFields.slice(0, -1));
  };

  /* For Cooking Process */

  const handleAddCookingProcessField = () => {
    setCookingProcessFields((prevFields: any) => [
      ...prevFields,
      { step: 0, description: "" },
    ]);
  };
  const handleDeleteLastCookingProcessField = () => {
    setCookingProcessFields((prevFields: any) => prevFields.slice(0, -1));
  };

  /* For Necessary Ingredients */

  const handleAddNecessaryField = () => {
    setNecessaryFields((prevFields: any) => [...prevFields, { name: "" }]);
  };
  const handleDeleteLastNecessaryField = () => {
    setNecessaryFields((prevFields: any) => prevFields.slice(0, -1));
  };

  ///////////////////////////////////////////////////////////////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("shortDescription", data.shortDescription);
    formData.append("cookingTime", data.cookingTime);
    formData.append("portion", data.portion.toString());
    formData.append("difficulty", data.difficulty);
    formData.append("recipeCategory", data.recipeCategory);
    formData.append("author", userID);

    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    if (data.nutrition)
      data.nutrition.forEach((value, i) => {
        formData.append(`nutrition[${i}][name]`, value.name);
        formData.append(`nutrition[${i}][weight]`, String(value.weight));
      });

    if (data.cookingProcess)
      data.cookingProcess.forEach((value, i) => {
        formData.append(`cookingProcess[${i}][step]`, String(value.step));
        formData.append(`cookingProcess[${i}][description]`, value.description);
      });

    if (data.necessaryIngredients)
      data.necessaryIngredients.forEach((value, i) => {
        formData.append(`necessaryIngredients[${i}][name]`, value.name);
      });

    if (data.ingredients)
      data.ingredients.forEach((value) => {
        formData.append(`ingredients[]`, value);
      });

    dispatch(
      createRecipe({
        recipe: formData,
      })
    )
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setPopupShowGoodResponse(true);
      })
      .catch(() => {
        setIsLoading(false);
        setPopupShowBedResponse(true);
      });
    setIsLoading(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="recipe_detail_form">
        {/* Name */}
        <div className="text_info">
          <label htmlFor="recipe_name_">სახელი:</label>
          <div className="inp">
            <input
              type="text"
              id="recipe_name_"
              {...register("name", {
                required: "სავალდებულოა სახელის მითითება",
              })}
            />
            <span className="p_white">
              {errors.name?.message && errors.name?.message}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <div className="text_info">
          <label htmlFor="recipe_shortDescription_">მოკლე აღწერა:</label>
          <div className="inp">
            <textarea
              id="recipe_shortDescription_"
              {...register("shortDescription", {
                required: "სავალდებულოა მოკლე მიმოხილვის მითითება",
              })}
            />
            <span className="p_white">
              {errors.shortDescription?.message &&
                errors.shortDescription?.message}
            </span>
          </div>
        </div>

        {/* Cooking Time */}
        <div className="text_info">
          <label htmlFor="recipe_cookingTime_">მომზადების დრო:</label>
          <div className="inp">
            <input
              type="text"
              id="recipe_cookingTime_"
              {...register("cookingTime", {
                required: "სავალდებულოა მოსამზადებელი დროის მითითება",
              })}
              placeholder="მიუთითეთ სიტყვიერად: 1 საათი"
            />
            <span className="p_white">
              {errors.cookingTime?.message && errors.cookingTime?.message}
            </span>
          </div>
        </div>

        {/* Portion */}
        <div className="text_info">
          <label htmlFor="recipe_portion_">პორცია:</label>
          <div className="inp">
            <input
              type="number"
              min={0}
              id="recipe_portion_"
              {...register("portion")}
            />
          </div>
        </div>

        {/* Image */}
        <div className="text_info">
          <label htmlFor="recipe_image">ფოტოს დამატება:</label>
          <div className="inp">
            <input
              type="file"
              id="recipe_image"
              {...register("image", { required: "გთხოვთ ატვირთოთ ფოტო" })}
              accept="image/*"
            />

            {errors.image?.message && (
              <span className="p_white">
                {errors.image?.message as ReactNode}
              </span>
            )}
          </div>
        </div>

        {/* Difficulty */}
        <div className="text_info">
          <label htmlFor="recipe_difficulty_">სირთულე:</label>
          <select id="recipe_difficulty_" {...register("difficulty")}>
            <option value="მარტივი">მარტივი</option>
            <option value="საშუალო">საშუალო</option>
            <option value="რთული">რთული</option>
          </select>
        </div>

        {/* Objected Data */}

        {/* Nutrition */}
        <div className="text_info">
          <label>საკვები შემადგენლობა:</label>
          <div className="actions">
            <div onClick={handleAddNutritionField}>დამატება</div>
            <div onClick={handleDeleteLastNutritionField}>წაშლა</div>
          </div>
          <aside>
            {nutritionFields.map((data: any, i: number) => (
              <fieldset key={i} className="both_info">
                <legend>
                  {i + 1}. {data.name && data.name}
                </legend>
                <div>
                  <label htmlFor={data.name + i}>სახელი:</label>
                  <div className="inp">
                    <input
                      type="text"
                      id={data.name + i}
                      {...register(`nutrition.${i}.name`)}
                      placeholder="მაგ: პროტეინი"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`amount-${i}`}>ოდენობა:</label>
                  <div className="inp">
                    <input
                      type="number"
                      min={0}
                      id={`amount-${i}`}
                      placeholder="მიუთითეთ გრამობით"
                      {...register(`nutrition.${i}.weight`)}
                    />
                  </div>
                </div>
              </fieldset>
            ))}
          </aside>
        </div>

        {/* Nutrition */}
        <div className="text_info">
          <label>მომზადების პროცესი:</label>
          <div className="actions">
            <div onClick={handleAddCookingProcessField}>დამატება</div>
            <div onClick={handleDeleteLastCookingProcessField}>წაშლა</div>
          </div>
          <aside>
            {cookingProcessFields.map((data: any, i: number) => (
              <fieldset key={i} className="both_info">
                <legend>პროცესი N{i + 1}.</legend>
                <div>
                  <label htmlFor={"process" + i}>პროცესის რიგითობა:</label>
                  <div className="inp">
                    <input
                      type="number"
                      id={"process" + i}
                      placeholder="მაგ: 1"
                      {...register(`cookingProcess.${i}.step`)}
                      min={0}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={"description" + i}>აღწერილობა:</label>
                  <div className="inp">
                    <textarea
                      id={"description" + i}
                      placeholder="მაგ: თავდაპირველად..."
                      {...register(`cookingProcess.${i}.description`)}
                    />
                  </div>
                </div>
              </fieldset>
            ))}
          </aside>
        </div>

        {/* Necessary  */}
        <div className="text_info">
          <label>საჭირო ინგრედიენტები:</label>
          <div className="actions">
            <div onClick={handleAddNecessaryField}>დამატება</div>
            <div onClick={handleDeleteLastNecessaryField}>წაშლა</div>
          </div>
          <aside>
            {necessaryFields.map((data: any, i: number) => (
              <fieldset key={i} className="both_info">
                <legend>ინგრედიენტი N{i + 1}:</legend>
                <div>
                  <label htmlFor={"necessary_" + i}>სახელი:</label>
                  <div className="inp">
                    <input
                      type="text"
                      id={"necessary_" + i}
                      placeholder="მაგ: 1 ჩ/კ შაქარი"
                      {...register(`necessaryIngredients.${i}.name`)}
                    />
                  </div>
                </div>
              </fieldset>
            ))}
          </aside>
        </div>

        {/* Choose Ingredients */}
        {ingredients.status === "success" ? (
          <div className="text_info">
            <label>აირჩიეთ ინგრედიენტები: ნაპოვნია {ingredients.result}</label>
            <div className="art">
              <article>
                {ingredients.data
                  .sort((a, b) => {
                    return ("" + a.name).localeCompare(b.name);
                  })
                  .map((data) => (
                    <div key={data._id}>
                      <label htmlFor={data._id}>{data.name}</label>
                      <input
                        type="checkBox"
                        defaultValue={data._id}
                        id={data._id}
                        {...register(`ingredients`, {
                          required: "მონიშნეთ მინიმუმ ერთი ინგრედიენტი",
                        })}
                      />
                    </div>
                  ))}
              </article>

              <span className="p_white">
                {errors.ingredients?.message && errors.ingredients?.message}
              </span>
            </div>
          </div>
        ) : (
          <div className="text_info">
            <label>
              ინგრედიენტი ვერ მოიძებნა, გთხოვთ სცადოთ თავიდან ან დაუაკვშირდით
              ადმინს
            </label>
          </div>
        )}

        {/* Recipe Category */}
        {recipeCategory.status === "success" ? (
          <div className="text_info">
            <label>აირჩიეთ კატეგორია: ნაპოვნია {recipeCategory.result}</label>
            <div className="art">
              <article>
                {recipeCategory.data
                  .sort((a, b) => {
                    return ("" + a.name).localeCompare(b.name);
                  })
                  .map((data) => (
                    <div key={data._id}>
                      <label htmlFor={data._id}>{data.name}</label>
                      <input
                        type="radio"
                        defaultValue={data._id}
                        id={data._id}
                        {...register(`recipeCategory`, {
                          required: "მონიშნეთ კატეგორია",
                        })}
                      />
                    </div>
                  ))}
              </article>
              <span className="p_white">
                {errors.recipeCategory?.message &&
                  errors.recipeCategory?.message}
              </span>
            </div>
          </div>
        ) : (
          <div className="text_info">
            <label>
              ინგრედიენტი ვერ მოიძებნა, გთხოვთ სცადოთ თავიდან ან დაუაკვშირდით
              ადმინს
            </label>
          </div>
        )}

        <button type="submit">დამატება</button>
      </form>
      {isLoading && (
        <div className="loading_center">
          <LoadingAnimation />
        </div>
      )}
      {popupShowGoodResponse && (
        <PopupMiddle
          buttonName="დახურვა"
          statusResponse="რეცეპტი წარმატებით დაემატა"
          buttonFunction={() => {
            setPopupShowGoodResponse(false);
            reset();
          }}
        />
      )}
      {popupShowBadResponse && (
        <PopupMiddle
          buttonName="დახურვა"
          statusResponse="რეცეპტის დამატებისას მოხდა შეცდომა. გთხოვთ სცაოთ ხელახლა"
          buttonFunction={() => {
            setPopupShowBedResponse(false);
          }}
        />
      )}
    </>
  );
}

export default RecipeAddForm;
