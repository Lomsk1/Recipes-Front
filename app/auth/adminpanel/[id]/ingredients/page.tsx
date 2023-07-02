import AdminIngredientsAction from "@/components/admin/ingredients";

export default function AdminPanelIngredients() {
  return (
    <>
      <header className="adminPanel_title">
        <h1>ინგრედიენტები</h1>
      </header>

      <main className="table_container">
        <AdminIngredientsAction />
      </main>
    </>
  );
}
