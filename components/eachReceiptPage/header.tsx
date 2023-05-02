import Image from "next/image";
import Link from "next/link";
import heartIcon from "../../assets/svg/heartEmpty.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import testImage from "../../assets/images/test.jpg";
import ReviewComponent from "../review";

function EachReceiptHeader() {
  return (
    <section className="each_receipt_title">
      {/* information */}
      <aside>
        <h1>ორმაგი ჩიზი მიზი გიზი ბურგერიკრაბსი</h1>
        <h3>ავტორი: გიორგი ლომსიანიძე</h3>
        <h4>მარტი, 16, 2024</h4>

        <div className="favorite">
          <p>ფავორიტებში დამატება</p>
          <Image src={heartIcon} alt="favorite" width={20} height={20} />
        </div>
        <ReviewComponent />
        <Link href="#">კომენტარების წაკითხვა</Link>
      </aside>
      {/* Image */}
      <aside>
        <Image className="re" src={testImage} alt="image" />
      </aside>
    </section>
  );
}

export default EachReceiptHeader;
