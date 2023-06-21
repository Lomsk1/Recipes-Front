import PaginationRecipe from "@/components/pagination";

async function getRecipeStats() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe/recipe-stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

async function getRecipes(params: { page: string; limit: string }) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe?page=${params.page}&limit=${params.limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

export default async function AllRecipePage({
  searchParams,
}: {
  searchParams: { page: string; limit: string };
}) {
  const recipeStats = await getRecipeStats();

  const recipes = await getRecipes({
    page: searchParams.page,
    limit: searchParams.limit,
  });

  return (
    <>
      <section className="all_recipe_page_section_one">
        <header>
          <h1>ყველა რეცეპტი ერთ სივრცეში</h1>
        </header>
        {/* Recipe Container */}
        {recipes && recipeStats && (
          <PaginationRecipe recipes={recipes} recipeStats={recipeStats} />
        )}
      </section>
    </>
  );
}
