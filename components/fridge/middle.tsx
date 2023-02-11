import Image from "next/image";
import citrus from "../../assets/fruit/lemon-download-lime-splash-png-image-pngimg-22.png";
import berries from "../../assets/fruit/m.png";
import tropical from "../../assets/fruit/4-2-fruit-png-image.png";
import apple from "../../assets/fruit/Apple.png";
import bulbs from "../../assets/vegetable/163593-fresh-pic-onion-free-transparent-image-hd.png";
import flowers_veg from "../../assets/vegetable/99315-images-green-broccoli-free-clipart-hd.png";
import tomato from "../../assets/vegetable/3-2-tomato-transparent.png";
import mushroom from "../../assets/vegetable/haridwar-mart-mushroom.png";
import leaves from "../../assets/vegetable/154243-lettuce-green-free-download-png-hd.png";
import rooted from "../../assets/vegetable/22147-8-carrot-cutting-pieces.png";
import seeds from "../../assets/vegetable/png.monster-310.webp";
import satacur from '../../assets/vegetable/39bb3615319143c2be16df1213daea5c.png'
import potato from '../../assets/vegetable/pngimg.com - potato_PNG7082.png'

function FridgeMiddleBody() {
  const imageWidth = 60;
  const lineEightArr = [citrus, berries, tropical, apple, bulbs];
  const lineSevenArr = [flowers_veg, tomato, mushroom, leaves, rooted];
  const lineSixArr = [seeds, satacur, potato];
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
        {lineSixArr &&
          lineSixArr.map((data, i) => (
            <Image
              key={i}
              src={data}
              alt=""
              width={imageWidth}
              height={imageWidth}
              style={{ left: `${i * 70}px` }}
            />
          ))}
      </div>
      <div className="middle_ middle_7">
        <div className="right_side_line"></div>
        {lineSevenArr &&
          lineSevenArr.map((data, i) => (
            <Image
              key={i}
              src={data}
              alt=""
              width={imageWidth}
              height={imageWidth}
              style={{ left: `${i * 70}px` }}
            />
          ))}
      </div>
      <div className="middle_ middle_8">
        <div className="right_side_line"></div>
        {lineEightArr &&
          lineEightArr.map((data, i) => (
            <Image
              key={i}
              src={data}
              alt=""
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
