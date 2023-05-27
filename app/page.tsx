import RecipeStatsCharts from "@/components/home_page/charts";
import HomeIntroduce from "@/components/home_page/introduce";
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

export default async function Home() {
  const data = await getRecipeStats();

  return (
    <main className={noto.variable}>
      <HomeIntroduce />
      <RecipeStatsCharts statsData={data} />
    </main>
  );
}
