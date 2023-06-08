"use client";

import Image from "next/image";
import logo from "../../assets/icons/receptor-logo-removebg-preview.png";
import NavLink from "../navLink";

function DashboardSidebar({ userID }: { userID: string }) {
  return (
    <aside className="dashboard_sidebar">
      <header>
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
          ]}
        />
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
