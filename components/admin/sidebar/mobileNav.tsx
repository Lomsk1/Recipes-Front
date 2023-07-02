import { setAdminSidebarToggle } from "@/redux/client/sidebar/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/icons/receptor-logo-removebg-preview.png";
import AdminNavLink from "./navlink";

function AdminNavigationForMobile({ userID }: { userID: string }) {
  const { adminSidebarIsOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  return (
    <>
      {adminSidebarIsOpen && (
        <aside className="admin_sidebar_mobile">
          {/* Logo */}
          <header>
            <Link href={"/"}>
              <Image src={logo} alt="logo" width={200} height={200} priority />
            </Link>
          </header>
          {/* Navigation */}
          <nav>
            <AdminNavLink userID={userID} />
            <Link
              href={"/auth/user-dashboard"}
              replace
              className="back_to"
              onClick={() => dispatch(setAdminSidebarToggle(false))}
            >
              უკან დაბრუნება
            </Link>
          </nav>
        </aside>
      )}
    </>
  );
}

export default AdminNavigationForMobile;
