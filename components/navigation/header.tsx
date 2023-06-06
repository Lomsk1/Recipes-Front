import Image from "next/image";
import Link from "next/link";
import userAvatar from "../../assets/svg/user.svg";
import { useRouter } from "next/navigation";

function MainPageHeader() {
  const navigate = useRouter();
  return (
    <header className="header_main_page">
      <nav>
        <ul>
          <li>
            <Link href={"/"}>მთავარი</Link>
          </li>
          <li>
            <Link href={"/recipes-by-ingredients"}>რეცეპტორი</Link>
          </li>
          <li>
            <Link
              href={{
                pathname: '/all-receipts',
                query: { page: "1", limit: "20" },
              }}
            >
              ყველა კერძი
            </Link>
          </li>
        </ul>

        <div className="_user" onClick={() => navigate.push("/auth")}>
          <Image src={userAvatar} alt="user avatar"></Image>
        </div>
      </nav>
    </header>
  );
}

export default MainPageHeader;
