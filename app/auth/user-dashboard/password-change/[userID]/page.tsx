import UserPasswordChangeForm from "@/components/userForms/passwordCHange";

async function UserDashboardMyInfo() {
  return (
    <>
      <main className="dashboard_password_change">
        <header>
          <h2>პაროლის ცვლილება</h2>
        </header>

        <section className="form_container">
          <UserPasswordChangeForm />
        </section>
      </main>
    </>
  );
}

export default UserDashboardMyInfo;
