import closeIcon from "../../assets/svg/delete.svg";
import Image from "next/image";

function ChosenInformation() {
  return (
    <section className="chosen_information">
      {/* Chosen Ingredients */}
      <div className="chosen_ingredients">
        <h2>თქვენ აირჩიეთ შემდეგი ინგრედიენტები</h2>
        <aside>
          {/* Ingredients */}
          <div>
            <p>კარაქი</p>
            <button>
              <Image src={closeIcon} alt="close"></Image>
            </button>
          </div>

          <div>
            <p>კარაქი</p>
            <button>
              <Image src={closeIcon} alt="close"></Image>
            </button>
          </div>

          <div>
            <p>კარაქი</p>
            <button>
              <Image src={closeIcon} alt="close"></Image>
            </button>
          </div>

          <div>
            <p>მარმელადი ტკბილი</p>
            <button>
              <Image src={closeIcon} alt="close"></Image>
            </button>
          </div>
        </aside>
      </div>

      {/* How many Dishes are there */}

      <div className="amount_of_dishes">
        <h2>
          ნაპოვნია <span>498</span> რეცეპტი
        </h2>
      </div>

      {/* Chosen Category */}

      <div className="chosen_category">
        <h2>შემოთავაზებული კატეგორიები</h2>
        <aside>
          <div>
            <p>პიცა</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
          <div>
            <p>ნამცხვარი</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ChosenInformation;
