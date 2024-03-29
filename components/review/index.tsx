import starIcon from "../../assets/svg/star.svg";
import starFullIcon from "../../assets/icons/starFull.png";

import Image from "next/image";

function ReviewComponent({
  ratingsAverage,
  ratingsQuantity,
}: {
  ratingsAverage: number | null;
  ratingsQuantity: number | null;
}) {
  return (
    <div className="review_component">
      {ratingsAverage && ratingsAverage >= 1 && ratingsAverage < 2 && (
        <>
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
        </>
      )}
      {ratingsAverage && ratingsAverage >= 2 && ratingsAverage < 3 && (
        <>
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
        </>
      )}
      {ratingsAverage && ratingsAverage >= 3 && ratingsAverage < 4 && (
        <>
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
        </>
      )}
      {ratingsAverage && ratingsAverage >= 4 && ratingsAverage < 4.8 && (
        <>
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starIcon} alt="star" width={15} height={15} />
        </>
      )}
      {ratingsAverage && ratingsAverage >= 4.8 && ratingsAverage <= 5 && (
        <>
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
          <Image src={starFullIcon} alt="star" width={15} height={15} />
        </>
      )}

      <div className="rating_amount">
        {ratingsQuantity && ratingsAverage && (
          <p>
            {ratingsQuantity}/{ratingsAverage}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReviewComponent;
