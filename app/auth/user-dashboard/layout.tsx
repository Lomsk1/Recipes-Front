import DashboardSidebar from "@/components/userDashboardSidebar";
import Image from "next/image";
import test from "../../../assets/icons/avatar.png";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import CookingLoader from "@/components/loading/cooking";
import UserSidebarBurger from "@/components/userDashboardSidebar/burger";
import UserDashboardSideProvider from "@/components/providerElements/userDashboard/mobileSide";

interface UserTypes {
  status: string;
  data: {
    _id: string;
    firstName: string;
  };
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

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: UserTypes = await getData();

  return (
    <>
      {data.status === "success" ? (
        <section className="user_dashboard">
          {/* Side bar */}
          <DashboardSidebar userID={data.data._id} />
          <UserSidebarBurger />
          <UserDashboardSideProvider />
          {/* Header */}
          <section className="dashboard_content">
            <header className="dashboard_header">
              <h1>მოგესალმებით, {data.data.firstName}</h1>
              <div className="avatar">
                <Image src={test} alt="avatar" width={50} height={50} />
              </div>
            </header>
            {/* Children */}
            {children}
          </section>
        </section>
      ) : (
        <div>
          <CookingLoader />
        </div>
      )}
    </>
  );
}
