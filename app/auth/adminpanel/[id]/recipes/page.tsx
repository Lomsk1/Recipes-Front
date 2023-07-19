import RecipeAdminTable from "@/components/admin/recipe";

export default function AdminPanelRecipes() {
  return (
    <>
      <header className="adminPanel_title">
        <h1>რეცეპტები</h1>
      </header>

      <main className="table_container">
        <RecipeAdminTable />
      </main>
    </>
  );
}
