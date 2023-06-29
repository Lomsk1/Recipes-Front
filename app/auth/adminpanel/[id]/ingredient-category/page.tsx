import IngredientCategoryTable from "@/components/admin/ingCategory/actions";
import Table from "@/components/table/table";
import { IngredientCategoryTypes } from "@/components/types/types";

// async function getIngredientCategoryData() {
//   const result = await fetch(
//     `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/ingredientCategory`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return result.json();
// }

export default async function AdminPanelIngredientCategory() {
  // const ingredientData: IngredientCategoryTypes =
  //   await getIngredientCategoryData();

  return (
    <>
      <header className="adminPanel_title">
        <h1>ინგრედიენტის კატეგორიები</h1>
      </header>

      <main className="table_container">
        <IngredientCategoryTable />
      </main>
    </>
  );
}
