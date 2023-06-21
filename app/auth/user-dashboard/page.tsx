"use server";

import Link from "next/link";
import chefIcon from "../../../assets/icons/chef_png.webp";
import Image from "next/image";
import RecipeStatsCharts from "@/components/home_page/charts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  if (!result.ok) redirect("/auth");

  return result.json();
}

async function UserDashboardPage({ userID }: { userID: number }) {
  const recipeStats = await getRecipeStats();
  const userData = await getData();
  return (
    <>
      <main className="dashboard_overview">
        <Link href={`/auth/user-dashboard/add-recipe/${userData.data._id}`}>
          <div className="info">
            <h2>დაამატეთ საკუთარი რეცეპტი</h2>
            <h4>ატვირთეთ საკუთარი რეცეპტი და გაუზიარეთ იგი სხვებს</h4>
          </div>
          <div className="image">
            <Image src={chefIcon} alt="chef" width={100} height={100} />
          </div>
        </Link>

        {/* I must add users Recipes stats */}
        <section className="about_recipes">
          <RecipeStatsCharts statsData={recipeStats} />
        </section>
      </main>
    </>
  );
}

export default UserDashboardPage;
