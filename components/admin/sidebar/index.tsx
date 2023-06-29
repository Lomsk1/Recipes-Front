import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/icons/receptor-logo-removebg-preview.png";
import AdminNavLink from "./navlink";

function AdminSideBar({ userID }: { userID: string }) {
  return (
    <>
      <aside className="admin_sidebar">
        {/* Logo */}
        <header>
          <Link href={"/"}>
            <Image src={logo} alt="logo" width={200} height={200} priority />
          </Link>
        </header>
        {/* Navigation */}
        <nav>
          <AdminNavLink userID={userID} />
          <Link href={"/auth/user-dashboard"} replace className="back_to">
            უკან დაბრუნება
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default AdminSideBar;
