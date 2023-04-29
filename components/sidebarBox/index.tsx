import Image from "next/image";
import allCousin from "../../assets/icons/All cuisines.png";

function SidebarIngredientBox() {
  return (
    <>
      <div className="sidebar_ingredient_box">
        {/* Group Title */}
        <header>
          <div className="image">
            <Image src={allCousin} alt="image" width={50} height={50}></Image>
          </div>
          <div className="information">
            <div className="up">
              <h4>ბოსტნეული</h4>
              <button>
                <div />
              </button>
            </div>
            <p>6/40 ინგრედიენტი</p>
          </div>
        </header>
        <hr />
        {/* ingredients */}
        <main className="container">
          {/* I mus change input div bg if it is checked or not */}
          <div className="ingredient">
            <input type="checkBox" name="butter" id="_butter" />
            <label htmlFor="_butter">კარაქი</label>
          </div>
          <div className="ingredient">
            <input type="checkBox" name="bread" id="_bread" />
            <label htmlFor="_bread">პური</label>
          </div>
          <div className="ingredient">
            <input type="checkBox" name="egg" id="_egg" />
            <label htmlFor="_egg">კვერცხი</label>
          </div>
        </main>
      </div>
    </>
  );
}

export default SidebarIngredientBox;
