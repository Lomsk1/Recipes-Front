import Image from "next/image";
import citrus from "../../assets/fruit/lemon-download-lime-splash-png-image-pngimg-22.png";
import berries from "../../assets/fruit/m.png";
import tropical from "../../assets/fruit/4-2-fruit-png-image.png";
import apple from "../../assets/fruit/Apple.png";

function FridgeMiddleBody() {
  const imageWidth = 60;
  const lineEightArr = [citrus, berries, tropical, apple];
  return (
    <div className="middle">
      <div className="middle_ middle_1">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_2">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_3">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_4">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_5">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_6">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_7">
        <div className="right_side_line"></div>
      </div>
      <div className="middle_ middle_8">
        <div className="right_side_line"></div>
        {lineEightArr &&
          lineEightArr.map((data, i) => (
            <Image
              src={data}
              alt="ციტრუსი"
              width={imageWidth}
              height={imageWidth}
              style={{ left: `${i * 70}px` }}
            />
          ))}
      </div>
    </div>
  );
}

export default FridgeMiddleBody;
