import UserAdminTable from "@/components/admin/user";

export default function AdminPanelUsers() {
  return (
    <>
      <header className="adminPanel_title">
        <h1>მომხმარებლები</h1>
      </header>

      <main className="table_container">
        <UserAdminTable />
      </main>
    </>
  );
}
