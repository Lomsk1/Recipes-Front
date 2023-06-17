import Image from "next/image";
import Link from "next/link";
import userAvatar from "../../assets/svg/user.svg";
import { useRouter } from "next/navigation";

interface UserDataTypes {
  userData: {
    status: string;
    data: {
      avatar: {
        url: string;
      };
    };
  };
}

function MainPageHeader({ userData }: UserDataTypes) {
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
                pathname: "/all-receipts",
                query: { page: "1", limit: "20" },
              }}
            >
              ყველა კერძი
            </Link>
          </li>
        </ul>

        <div className="_user" onClick={() => navigate.push("/auth")}>
          <Image
            src={
              userData && userData.status === "success"
                ? userData.data.avatar.url
                : userAvatar
            }
            alt="user avatar"
            width={100}
            height={100}
          />
        </div>
      </nav>
    </header>
  );
}

export default MainPageHeader;
