import CookingLoader from "@/components/loading/cooking";
import RecipesWithDetails from "@/components/recipeContainer/withDetails";
import RecipeDetailForUser from "@/components/userForms/recipeDetaile";
import { redirect } from "next/navigation";

interface FavRecipeTypes {
  status: string;
  data: {
    _id: string;
    image: {
      public_id: string;
      url: string;
    };
    name: string;
  }[];
}

async function getRecipe({ userID }: { userID: string }) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe?author=${userID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!result.ok) redirect("/auth/user-dashboard");
  return result.json();
}

async function UserDashboardMyRecipes({
  params,
}: {
  params: { userID: string };
}) {
  const favoriteRecipesData: FavRecipeTypes = await getRecipe({
    userID: params.userID,
  });
  return (
    <>
      <main className="dashboard_my_recipes">
        <section className="recipe_container">
          {favoriteRecipesData.status === "success" ? (
            favoriteRecipesData.data.map((recipe) => (
              <RecipesWithDetails
                key={recipe._id}
                name={recipe.name}
                image={recipe.image}
                _id={recipe._id}
              />
            ))
          ) : (
            <CookingLoader />
          )}
        </section>

        <section className="recipe_detailed">
          <h2>რეცეპტის დეტალური ინფორმაცია</h2>

          <div className="detailed_container">
            <RecipeDetailForUser />
          </div>
        </section>
      </main>
    </>
  );
}

export default UserDashboardMyRecipes;
