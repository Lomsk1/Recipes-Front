import FridgeMiddleBody from "@/components/fridge/middle";
import Image from "next/image";

export default function ChooseIngredients() {
  return (
    <main>
      <section className="choose_fridge_section">
        <div className="fridge_body">
          {/* Upper */}
          <div className="upper_body">
            <div className="left_body">
              {/* Left Products */}
              <div className="left">
                <div className="left_ left_1"></div>
                <div className="left_ left_2"></div>
                <div className="left_ left_3"></div>
                <div className="left_ left_4"></div>
                <div className="left_ left_5"></div>
                <div className="left_ left_6"></div>
                {/* <div className="left_ left_7"></div>
              <div className="left_ left_8"></div>
              <div className="left_ left_9"></div>
              <div className="left_ left_10"></div> */}
              </div>
            </div>
            {/* Main Section */}
            <FridgeMiddleBody />
            <div className="right_body">
              {/* Right Products */}
              <div className="right">
                <div className="right_ right_1"></div>
                <div className="right_ right_2"></div>
                <div className="right_ right_3"></div>
                <div className="right_ right_4"></div>
                <div className="right_ right_5"></div>
                <div className="right_ right_6"></div>
                {/* <div className="right_ right_7"></div>
              <div className="right_ right_8"></div>
              <div className="right_ right_9"></div>
              <div className="right_ right_10"></div> */}
              </div>
            </div>
          </div>
          <div className="border"></div>
          {/* Down */}
          <div className="down_body"></div>
          <div className="freezer">
            <div className="freezer_ freezer_1">
              <div className="right_side_line"></div>
            </div>
            <div className="freezer_ freezer_2">
              <div className="right_side_line"></div>
            </div>
            <div className="freezer_ freezer_3">
              <div className="right_side_line"></div>
            </div>
            {/* <div className="freezer_ freezer_4"></div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
