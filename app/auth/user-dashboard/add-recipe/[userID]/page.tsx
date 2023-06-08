import RecipeAddForm from "@/components/userForms/recipeAdd";

async function getIngredients() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredient`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

async function gerRecipeCategories() {
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

async function UserDashboardMyRecipes({
  params,
}: {
  params: { userID: string };
}) {
  const ingredientData = await getIngredients();
  const recipeCategoriesData = await gerRecipeCategories();
  return (
    <>
      <main className="dashboard_add_recipe">
        <header>
          <h2>რეცეპტის დამატება</h2>
        </header>

        <section className="form_container">
          <RecipeAddForm
            ingredients={ingredientData}
            recipeCategory={recipeCategoriesData}
            userID={params.userID}
          />
        </section>
      </main>
    </>
  );
}

export default UserDashboardMyRecipes;
