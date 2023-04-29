import Image from "next/image";
import userAvatar from "../../assets/icons/user_avatar.png";

export default function ChooseIngredients() {
  return (
    <main className="main_page">
      {/* Header && NAvigation */}
      <header className="header_main_page">
        <nav>
          <h1>რეცეპტორი</h1>

          <ul>
            <li>
              <div>
                <Image src={userAvatar} alt="user avatar"></Image>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </main>
  );
}
