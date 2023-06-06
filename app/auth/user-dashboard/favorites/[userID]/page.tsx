import CookingLoader from "@/components/loading/cooking";
import RecipeContainerSquare from "@/components/recipeContainer/square";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FavRecipeTypes {
  status: string;
  data: {
    _id: string;
    recipe: {
      image: {
        public_id: string;
        url: string;
      };
      _id: string;
      name: string;
      difficulty: string;
      cookingTime: string;
    };
    user: string;
  }[];
}

async function getFavRecipes({ userID }: { userID: string }) {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipeFavorite/byUser/${userID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  if (!result.ok) redirect("/auth/user-dashboard");
  return result.json();
}

async function UserDashboardFavorites({
  params,
}: {
  params: { userID: string };
}) {
  const favoriteRecipesData: FavRecipeTypes = await getFavRecipes({
    userID: params.userID,
  });

  console.log(favoriteRecipesData);
  return (
    <>
      <main className="dashboard_favorites">
        <h2>ჩემი ფავორიტი რეცეპტები:</h2>
        <section className="recipe_container">
          {favoriteRecipesData.status === "success" ? (
            favoriteRecipesData.data
              .filter((data) => data.recipe != null)
              .map((recipes) => (
                <RecipeContainerSquare
                  key={recipes._id && recipes._id}
                  id={recipes.recipe && recipes.recipe._id}
                  imageUrl={recipes.recipe && recipes.recipe.image.url}
                  cookingTime={recipes.recipe && recipes.recipe.cookingTime}
                  name={recipes.recipe && recipes.recipe.name}
                  difficulty={recipes.recipe && recipes.recipe.difficulty}
                />
              ))
          ) : (
            <CookingLoader />
          )}
        </section>
      </main>
    </>
  );
}

export default UserDashboardFavorites;
