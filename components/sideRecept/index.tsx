import Image from "next/image";
import testImage from "../../assets/images/test.jpg";
import heartEmptyIcon from "../../assets/svg/heartEmpty.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import ReviewComponent from "../review";
import clockIcon from "../../assets/svg/alarm-clock.svg";
import closeIcon from "../../assets/svg/delete.svg";
import checkIcon from "../../assets/svg/circle-check-solid.svg";
import Link from "next/link";

function ReceptSide() {
  return (
    <div className="side_receipts_box">
      {/* Close */}
      <button className="close">
        <Image src={closeIcon} alt="close" width={40} height={40}></Image>
      </button>
      {/* Image */}
      <div className="image">
        <Image src={testImage} alt="image" />
      </div>
      {/* Information */}
      <div className="information">
        {/* Header */}
        <header>
          <aside>
            {/* Title */}
            <h3>ლობიანი იმერული</h3>
            <button>
              <Image src={heartEmptyIcon} alt="heart" width={15} height={15} />
            </button>
          </aside>
          <hr />
          {/* Review & Time */}
          <div className="rew_time">
            <ReviewComponent />
            <div className="time">
              <Image src={clockIcon} alt="heart" width={15} height={15} />
              <p>38 წუთი</p>
            </div>
          </div>
        </header>
        {/* ingredients */}
        <main>
          <h3>ინგრედიენტები</h3>
          {/* Each Ingredient */}
          <div className="_ingredient">
            <p>
              2 სიფრის კოვზი ფქვილი, 1 სუფრის კოვზი მარილი და კიდევ რაღაცები
            </p>
            <Image src={checkIcon} alt="check" width={17} height={17} />
          </div>
          <div className="_ingredient">
            <p>2 სიფრის კოვზი ფქვილი</p>
            <Image src={checkIcon} alt="check" width={17} height={17} />
          </div>
          <div className="_ingredient">
            <p>
              2 სიფრის კოვზი ფქვილი, 1 სუფრის კოვზი მარილი და კიდევ რაღაცები
            </p>
            <Image src={checkIcon} alt="check" width={17} height={17} />
          </div>
        </main>
        {/* Button for Full receipt */}
        <Link href={"#"} className="full_receipt">
          სრული რეცეპტის ნახვა
        </Link>
      </div>

      {/* Nutrition Facts */}
      <div className="nutrition_facts">
        <h3>საკვები შემადგენლობა</h3>
        {/* Each Nutrition */}
        <div className="_ingredient">
          <p>კალორია</p>
          <span>140.1 კალორია</span>
        </div>
        <div className="_ingredient">
          <p>ცხიმი</p>
          <span>2.4 გრამი</span>
        </div>
      </div>
    </div>
  );
}

export default ReceptSide;
