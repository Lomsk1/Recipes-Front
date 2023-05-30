import { setIngredients } from "@/redux/client/ingredients/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import allCousin from "../../assets/icons/All cuisines.png";

interface SideTypes {
  amount: number;
  title: string;
  ingredientData: {
    name: string;
    _id: string;
  }[];
}

function SidebarIngredientBox({ amount, title, ingredientData }: SideTypes) {
  const dispatch = useAppDispatch();
  const redux: any = useAppSelector((state) => state.ingredientClient);

  const [chosenIngredients, setChosenIngredients] = useState<number>(0);

  const [localIngredients, setLocalIngredients] = useState<any>([]);

  const memoizedDispatch = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    const storedData = localStorage.getItem("ingredients");
    if (storedData) {
      setLocalIngredients(JSON.parse(storedData));
      memoizedDispatch(setIngredients(JSON.parse(storedData)));
    }
  }, [memoizedDispatch]);

  useEffect(() => {
    const numChecked = document.querySelectorAll(
      `input[type="checkbox"][data-group="${title}"]:checked`
    ).length; // Count the number of checked inputs in the current input group
    setChosenIngredients(numChecked);
  }, [redux, title]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    const checked = e.target.checked;
    const id = e.target.id.slice(1);
    let ingredients = localStorage.getItem("ingredients");
    let ingredientsArr = ingredients ? JSON.parse(ingredients) : [];
    if (checked) {
      ingredientsArr.push(data);
    } else {
      ingredientsArr = ingredientsArr.filter((i: any) => i._id !== id);
    }
    localStorage.setItem("ingredients", JSON.stringify(ingredientsArr));
    dispatch(setIngredients(ingredientsArr));
    setLocalIngredients(ingredientsArr);

    const inputGroup = e.target.dataset.group; // Get the input group identifier
    const numChecked = document.querySelectorAll(
      `input[type="checkbox"][data-group="${inputGroup}"]:checked`
    ).length; // Count the number of checked inputs in the current input group

    setChosenIngredients(numChecked);
  };
  return (
    <>
      <div className="sidebar_ingredient_box">
        {/* Group Title */}
        <header>
          <div className="image">
            <Image src={allCousin} alt="image" width={50} height={50}></Image>
          </div>
          <div className="information">
            <div className="up">
              <h4>{title}</h4>
              <button>
                <div />
              </button>
            </div>
            <p>
              {chosenIngredients}/{amount} ინგრედიენტი
            </p>
          </div>
        </header>
        <hr />
        {/* ingredients */}
        <main className="container">
          {ingredientData &&
            ingredientData
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((data) => (
                <div
                  className="ingredient"
                  key={data._id}
                  style={{
                    backgroundColor: redux.ingredients
                      .map((id: any) => id._id)
                      .includes(data._id)
                      ? "#db3a34"
                      : "",
                  }}
                >
                  <input
                    type="checkBox"
                    name={data.name}
                    id={`_${data._id}`}
                    onChange={(e) => {
                      inputHandler(e, data);
                    }}
                    checked={redux.ingredients
                      .map((id: any) => id._id)
                      .includes(data._id)}
                    data-group={title}
                  />
                  <label htmlFor={`_${data._id}`}>{data.name}</label>
                </div>
              ))}
        </main>
      </div>
    </>
  );
}

export default SidebarIngredientBox;
