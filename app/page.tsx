import RecipeStatsCharts from "@/components/home_page/charts";
import HomeIntroduce from "@/components/home_page/introduce";
import TopProducts from "@/components/home_page/topProducts";
import { Noto_Sans_Georgian } from "@next/font/google";

export const metadata = {
  title: "Receptor",
  description: "In this site, you can find all kind of recipes.",
};

const noto = Noto_Sans_Georgian({
  variable: "--font-georgia",
  weight: ["300", "500", "700", "900"],
  subsets: ["georgian"],
});

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

async function getRecentRecipes() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe?limit=4&fields=-review,-recipeCategory,-author,-difficulty,-cookingTime,-portion,-ratingsAverage,-ratingsQuantity,-nutrition,-cookingProcess,-necessaryIngredients,-ingredients,-recipeCategory`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

async function getFavoriteRecipes() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe?limit=4&sort=-ratingsAverage&fields=-review,-recipeCategory,-author,-difficulty,-cookingTime,-portion,-ratingsAverage,-ratingsQuantity,-nutrition,-cookingProcess,-necessaryIngredients,-ingredients,-recipeCategory`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.json();
}

export default async function Home() {
  const data = await getRecipeStats();
  const recentRecipes = await getRecentRecipes();
  const favoriteRecipes = await getFavoriteRecipes();

  return (
    <main className={noto.variable}>
      <HomeIntroduce />
      <TopProducts
        recentRecipeData={recentRecipes}
        favoriteRecipeData={favoriteRecipes}
      />
      <RecipeStatsCharts statsData={data} />
    </main>
  );
}
