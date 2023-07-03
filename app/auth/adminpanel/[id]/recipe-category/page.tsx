import RecipeCategoryTable from "@/components/admin/recipeCategory";

export default function AdminPanelRecipeCategory() {
  return (
    <>
      <header className="adminPanel_title">
        <h1>რეცეპტის კატეგორიები</h1>
      </header>
      <main className="table_container">
        <RecipeCategoryTable />
      </main>
    </>
  );
}
