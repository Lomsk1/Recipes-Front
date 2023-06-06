"use client";
import { setUserSidebarToggle } from "@/redux/client/sidebar/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import logo from "../../assets/icons/receptor-logo-removebg-preview.png";
import NavLink from "../navLink";

function UserSidebarForMobile() {
  const { userSidebarIsOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  return (
    <>
      {userSidebarIsOpen && (
        <aside className="userSidebarForMobile">
          <header>
            <Image src={logo} alt="logo" width={100} height={100} priority />
          </header>

          <nav>
            <NavLink
              navLinks={[
                {
                  href: "/auth/user-dashboard",
                  name: "მიმოხილვა",
                  //   onClick() {
                  //     dispatch(setUserSidebarToggle(false));
                  //   },
                },
                {
                  href: "/auth/user-dashboard/favorites",
                  name: "ჩემი ფავორიტები",
                  //   onClick() {
                  //     dispatch(setUserSidebarToggle(false));
                  //   },
                },
              ]}
            />
          </nav>
        </aside>
      )}
    </>
  );
}

export default UserSidebarForMobile;
