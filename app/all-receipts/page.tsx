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

export default async function AllRecipePage() {
  const recipeStats = await getRecipeStats();

  return (
    <>
      <section className="all_recipe_page_section_one">
        <header>
          <h1>ყველა რეცეპტი ერთ სივრცეში</h1>
        </header>
        {/* Recipe Container */}
        {/* {recipeStats && <PaginationRecipe recipeStats={recipeStats} />} */}
      </section>
    </>
  );
}
