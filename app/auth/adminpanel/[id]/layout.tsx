import AdminSideBar from "@/components/admin/sidebar";
import { UserTypes } from "@/components/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserData() {
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
  if (!result.ok) redirect("/");
  return result.json();
}

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserTypes = await getUserData();

  if (user.data.role !== "admin") redirect("/");

  return (
    <section className="adminPanel_layout">
      <AdminSideBar userID={user.data._id} />
      <section className="section_content"> {children}</section>
    </section>
  );
}
