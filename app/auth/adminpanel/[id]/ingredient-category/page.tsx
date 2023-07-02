import IngredientCategoryTable from "@/components/admin/ingCategory/actions";

export default async function AdminPanelIngredientCategory() {
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
