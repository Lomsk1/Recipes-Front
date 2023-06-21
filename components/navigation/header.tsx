import Image from "next/image";
import Link from "next/link";
import userAvatar from "../../assets/svg/user.svg";
import { useRouter } from "next/navigation";

interface UserDataTypes {
  userData:
    | {
        status: string;
        data: {
          avatar: {
            url: string;
          };
        };
      }
    | undefined;
}

function MainPageHeader({ userData }: UserDataTypes) {
  return (
    <>
      <header className="header_main_page">
        {userData && (
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

            <div className="_user">
              {userData && userData.status === "success" && (
                <Image
                  priority
                  src={userData.data.avatar.url}
                  alt="user avatar"
                  width={100}
                  height={100}
                />
              )}
              {userData && userData.status === "fail" && (
                <Link href={"/auth"}>
                  <Image
                    priority
                    src={userAvatar}
                    alt="user avatar"
                    width={100}
                    height={100}
                  />
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export default MainPageHeader;
