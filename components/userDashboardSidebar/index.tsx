"use client";

import Image from "next/image";
import logo from "../../assets/icons/receptor-logo-removebg-preview.png";
import NavLink from "../navLink";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

function DashboardSidebar({ userID, role }: { userID: string; role: string }) {
  const navigate = useRouter();

  return (
    <aside className="dashboard_sidebar">
      <header onClick={() => navigate.push("/recipes-by-ingredients")}>
        <Image src={logo} alt="logo" width={100} height={100} priority />
      </header>

      <nav>
        <NavLink
          navLinks={[
            { href: "/auth/user-dashboard", name: "მიმოხილვა" },
            {
              href: `/auth/user-dashboard/favorites/${userID}`,
              name: "ჩემი ფავორიტები",
            },
            {
              href: `/auth/user-dashboard/my-recipes/${userID}`,
              name: "ჩემი რეცეპტები",
            },
            {
              href: `/auth/user-dashboard/add-recipe/${userID}`,
              name: "რეცეპტის დამატება",
            },
            {
              href: `/auth/user-dashboard/info/${userID}`,
              name: "ინფო",
            },
            {
              href: `/auth/user-dashboard/password-change/${userID}`,
              name: "პაროლის შეცვლა",
            },
          ]}
        />

        {role === "admin" && (
          <Link href={`/auth/adminpanel/${userID}`} className="adminPanel">
            ადმინი
          </Link>
        )}

        <button
          onClick={() => {
            Cookies.remove("jwt");
            navigate.push("/");
          }}
        >
          გამოსვლა
        </button>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
