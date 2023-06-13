import UserInfoChangeForm from "@/components/userForms/userChange";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import UserPasswordChangeForm from "@/components/userForms/passwordCHange";

// interface UserInfoTypes {
//   status: string;
//   data: {
//     _id: string;
//     avatar: {
//       url: string;
//     };
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
// }

// async function getData() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("jwt");

//   const result = await fetch(
//     `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token?.value}`,
//       },
//     }
//   );
//   if (!result.ok) redirect("/auth");

//   return result.json();
// }

async function UserDashboardMyInfo({ params }: { params: { userID: string } }) {
  //   const userData: UserInfoTypes = await getData();

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
