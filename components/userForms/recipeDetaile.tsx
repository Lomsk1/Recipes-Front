"use client";

import { updateRecipe } from "@/API/receipt/action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
};

interface RecipeApiProps {
  isLoading: boolean;
  receptDataById: {
    status: string;
    data: {
      _id: string;
      name: string;
      shortDescription: string;
      difficulty: string;
      cookingTime: string;
      portion: number;
      nutrition: {
        name: string;
        weight: number;
        _id: string;
      }[];
      cookingProcess: {
        step: number;
        description: string;
        _id: string;
      }[];
      necessaryIngredients: {
        name: string;
        _id: string;
      }[];
    };
  };
}

function RecipeDetailForUser() {
  const { receptDataById, isLoading }: RecipeApiProps = useAppSelector(
    (state) => state.recipeAPI
  );
  const dispatch = useAppDispatch();

  /* useForm */
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  useEffect(() => {
    setValue("name", `${receptDataById.data && receptDataById.data.name}`);
    setValue(
      "shortDescription",
      `${receptDataById.data && receptDataById.data.shortDescription}`
    );
    setValue(
      "cookingTime",
      `${receptDataById.data && receptDataById.data.cookingTime}`
    );
    setValue("portion", receptDataById.data && receptDataById.data.portion);
    setValue(
      "difficulty",
      receptDataById.data && receptDataById.data.difficulty
    );
    setValue(
      "nutrition",
      receptDataById.data &&
        receptDataById.data.nutrition.map(({ name, weight }) => ({
          name,
          weight,
        }))
    );
    setValue(
      "cookingProcess",
      receptDataById.data &&
        receptDataById.data.cookingProcess.map(({ step, description }) => ({
          step,
          description,
        }))
    );
    setValue(
      "necessaryIngredients",
      receptDataById.data &&
        receptDataById.data.necessaryIngredients.map(({ name }) => ({ name }))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receptDataById]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("shortDescription", data.shortDescription);
    formData.append("cookingTime", data.cookingTime);
    formData.append("portion", data.portion.toString());
    formData.append("difficulty", data.difficulty);

    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    data.nutrition.forEach((value, i) => {
      formData.append(`nutrition[${i}][name]`, value.name);
      formData.append(`nutrition[${i}][weight]`, String(value.weight));
    });

    data.cookingProcess.forEach((value, i) => {
      formData.append(`cookingProcess[${i}][step]`, String(value.step));
      formData.append(`cookingProcess[${i}][description]`, value.description);
    });
    data.necessaryIngredients.forEach((value, i) => {
      formData.append(`necessaryIngredients[${i}][name]`, value.name);
    });

    dispatch(
      updateRecipe({
        recipeID: receptDataById.data._id,
        recipe: formData,
      })
    );
  };
  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit(onSubmit)} className="recipe_detail_form">
          {/* Name */}
          <div className="text_info">
            <label htmlFor="recipe_name">სახელი:</label>
            <input type="text" id="recipe_name" {...register("name")} />
          </div>

          {/* Short Description */}
          <div className="text_info">
            <label htmlFor="recipe_shortDescription">მოკლე აღწერა:</label>
            <textarea
              id="recipe_shortDescription"
              {...register("shortDescription")}
            />
          </div>

          {/* Cooking Time */}
          <div className="text_info">
            <label htmlFor="recipe_cookingTime">მომზადების დრო:</label>
            <input
              type="text"
              id="recipe_cookingTime"
              {...register("cookingTime")}
            />
          </div>

          {/* Portion */}
          <div className="text_info">
            <label htmlFor="recipe_portion">პორცია:</label>
            <input
              type="number"
              min={0}
              id="recipe_portion"
              {...register("portion")}
            />
          </div>

          {/* Image */}
          <div className="text_info">
            <label htmlFor="recipe_image">ფოტოს ცვლილება:</label>
            <input
              type="file"
              id="recipe_image"
              {...register("image")}
              accept="image/*"
            />
          </div>

          {/* Difficulty */}
          <div className="text_info">
            <label htmlFor="recipe_difficulty">სირთულე:</label>
            <select id="recipe_difficulty" {...register("difficulty")}>
              <option value="მარტივი">მარტივი</option>
              <option value="საშუალო">საშუალო</option>
              <option value="რთული">რთული</option>
            </select>
          </div>

          {/* Object Data */}

          {/* Nutrition */}
          <div className="text_info">
            <label htmlFor="recipe_nutrition">საკვები შემადგენლობა:</label>

            <aside>
              {!isLoading &&
                receptDataById.data.nutrition.length > 0 &&
                receptDataById.data.nutrition.map((data, i) => (
                  <fieldset key={data._id} className="both_info">
                    <legend>
                      {i + 1}. {data.name && data.name}
                    </legend>
                    {/* Name */}
                    <div>
                      <label htmlFor={data.name}>სახელი:</label>
                      <input
                        type="text"
                        id={data.name}
                        {...register(`nutrition.${i}.name`)}
                      />
                    </div>
                    {/* Weight */}
                    <div>
                      <label htmlFor={data._id}>ოდენობა:</label>
                      <input
                        type="number"
                        min={0}
                        id={data._id}
                        {...register(`nutrition.${i}.weight`)}
                      />
                    </div>
                  </fieldset>
                ))}
            </aside>
          </div>

          {/* Cooking Process */}
          <div className="text_info">
            <label htmlFor="recipe_cookingProcess">მომზადების პროცესი:</label>

            <aside>
              {!isLoading &&
                receptDataById.data.cookingProcess.length > 0 &&
                receptDataById.data.cookingProcess.map((data, i) => (
                  <fieldset key={data._id} className="both_info">
                    <legend>პროცესი N{data.step}.</legend>
                    {/* Process Numeric */}
                    <div>
                      <label htmlFor={data._id + i}>პროცესის რიგითობა:</label>
                      <input
                        type="number"
                        id={data._id + i}
                        {...register(`cookingProcess.${i}.step`)}
                        min={0}
                      />
                    </div>
                    {/* Process Description */}
                    <div>
                      <label htmlFor={data._id}>აღწერილობა:</label>
                      <textarea
                        id={data._id}
                        {...register(`cookingProcess.${i}.description`)}
                      />
                    </div>
                  </fieldset>
                ))}
            </aside>
          </div>

          {/* Necessary  */}
          <div className="text_info">
            <label htmlFor="recipe_necessary">საჭირო ინგრედიენტები:</label>

            <aside>
              {!isLoading &&
                receptDataById.data.necessaryIngredients.length > 0 &&
                receptDataById.data.necessaryIngredients.map((data, i) => (
                  <fieldset key={data._id} className="both_info">
                    <legend>ინგრედიენტი N{i + 1}:</legend>
                    {/* Name */}
                    <div>
                      <label htmlFor={data._id}>სახელი:</label>
                      <input
                        type="text"
                        id={data._id}
                        {...register(`necessaryIngredients.${i}.name`)}
                      />
                    </div>
                  </fieldset>
                ))}
            </aside>
          </div>
          <button type="submit">შეცვლა</button>
        </form>
      ) : (
        <h3>გთხოვთ აირჩიოთ რეცეპტი</h3>
      )}
    </>
  );
}

export default RecipeDetailForUser;
