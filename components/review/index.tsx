import starIcon from "../../assets/svg/star.svg";
import starFullIcon from "../../assets/icons/starFull.png";

import Image from "next/image";

function ReviewComponent() {
  return (
    <div className="review_component">
      <Image src={starFullIcon} alt="star" width={15} height={15} />
      <Image src={starFullIcon} alt="star" width={15} height={15} />
      <Image src={starFullIcon} alt="star" width={15} height={15} />
      <Image src={starIcon} alt="star" width={15} height={15} />
      <Image src={starIcon} alt="star" width={15} height={15} />
    </div>
  );
}

export default ReviewComponent;
