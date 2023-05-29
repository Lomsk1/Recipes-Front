import Link from "next/link";
import AnnuallyStatsProvider from "../providerElements/stats/annualStats";
import AnnualForm from "../providerElements/stats/form";
import AllRecipeChart from "./charts/all";
import EachRecipeChart from "./charts/each";

interface StatsDataTypes {
  statsData: {
    status: string;
    stats: {
      _id: string;
      numRecipes: number;
      numRatings: number;
      avgRating: number;
    }[];
  };
}

function RecipeStatsCharts({ statsData }: StatsDataTypes) {
  return (
    <>
      <section className="recipe_stats_charts">
        {/* Chart by Difficulty */}
        <header>
          <aside className="chart_">
            {statsData.status === "success" ? (
              <EachRecipeChart stats={statsData.stats} />
            ) : (
              <div>Loading...</div>
            )}
          </aside>
          <aside className="_info">
            <p>
              თქვენ აქ შეგიძლიათ ნახოთ რეცეპტები მომზადების სირთულის მიხედვით.
            </p>
            <p>
              თუ კი გსურთ მარტივი, მაგრამ ამავდროულად უგემრიელესი საჭმლის
              გაკეთება, მაშინ ეს პლატფორმა სწორედ თქვენთვისაა!
            </p>
          </aside>
        </header>
        {/* Chart by All */}
        <main>
          <aside className="_info">
            <p>
              ამავდროულად, თქვენ შეგიძლიათ შექმნათ თქვენი სასურველი რეცეპტი,
              შეაფასოთ იგი და გაუზიაროთ სხვებს! <br />
              <span>ამისთვის გთხოვთ გადახვიდეთ მითითებულ ლინკზე</span>
            </p>
            <Link href={"#"}>შექმენით რეცეპტი</Link>
          </aside>
          <aside className="chart_">
            {statsData.status === "success" ? (
              <AllRecipeChart stats={statsData.stats} />
            ) : (
              <div>Loading...</div>
            )}
          </aside>
        </main>
        {/* Annual Chart */}
        <main>
          <aside className="chart_">
            <AnnuallyStatsProvider />
          </aside>
          <aside className="_info">
            <p>
              იმისათვის, რომ ნახოთ ყოველწლიური რეცეპტის ოდენობ, გთხოვთ აირჩიოთ
              წელი:
            </p>
            <AnnualForm />
          </aside>
        </main>
      </section>
    </>
  );
}

export default RecipeStatsCharts;
