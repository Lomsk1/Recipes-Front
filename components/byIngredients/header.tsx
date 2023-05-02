import Image from "next/image";
import Link from "next/link";
import userAvatar from "../../assets/svg/user.svg";

function MainPageHeader() {


  return (
    <header className="header_main_page">
      <nav>
        <ul>
          <li>
            <Link href={"#"}>რეცეპტორი</Link>
          </li>
          <li>
            <Link href={"#"}>ყველა კერძი</Link>
          </li>
        </ul>

        <div className="_user">
          <Image src={userAvatar} alt="user avatar"></Image>
        </div>
      </nav>
    </header>
  );
}

export default MainPageHeader;
