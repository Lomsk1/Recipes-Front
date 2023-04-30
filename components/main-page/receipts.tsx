import Image from "next/image";
import testImg from "../../assets/images/test.jpg";
import heartEmptyIcon from "../../assets/svg/heartEmpty.svg";
import linkIcon from "../../assets/svg/export.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";

function ReceiptsBox() {
  return (
    <div className="receipt_box">
      {/* Image */}
      <div className="image">
        <Image src={testImg} alt="image" />
      </div>
      {/* Information */}
      <div className="information">
        <h4>საჭმლის სათაური (სახელი)</h4>
        <p>
          მომზადების დრო: <span>30</span> წუთი
        </p>
        <p>
          საჭირო ინგრედიენტების რაოდენობა: <span>4</span>
        </p>
      </div>
      {/* Actions */}
      <div className="actions">
        <button>
          <Image src={heartEmptyIcon} alt="heart" width={15} height={15} />
        </button>
        <button>
          <Image src={linkIcon} alt="heart" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default ReceiptsBox;
