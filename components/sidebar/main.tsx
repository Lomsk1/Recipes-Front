import Image from "next/image";
import searchIcon from "../../assets/icons/search-white.png";
import SidebarIngredientBox from "../sidebarBox";
import vegetableBg from "../../assets/images/vegetables-pattern-logo-3F32CE0653-seeklogo.com.png";

function MainSideBar() {
  return (
    <section className="main_sidebar">
      {/* Header */}
      <header className="sidebar_navigation">
        <div className="filter">
          <Image priority src={vegetableBg} alt="vegetable"></Image>
        </div>
        <h1>საძიებო</h1>
        <form className="sidebar_search_form">
          <input
            type="search"
            name=""
            id=""
            placeholder="ჩაწერეთ ინგრედიენტის სახელი"
          />
          <button type="submit">
            <Image src={searchIcon} alt="search" />
          </button>
        </form>
      </header>

      {/* Ingredients */}
      <main className="ingredients">
        <SidebarIngredientBox />

        <SidebarIngredientBox />

        <SidebarIngredientBox />

        <SidebarIngredientBox />
      </main>
    </section>
  );
}

export default MainSideBar;
