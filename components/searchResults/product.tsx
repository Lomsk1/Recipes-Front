import Link from "next/link";
import Image from "next/image";

function SearchProductBox() {
  return (
    <Link href={"#"} className="search_product_result">
      <div className="image">
        <Image
          src={
            "https://res.cloudinary.com/dxnqoeq2e/image/upload/v1684784471/Receipt/Recipe/dsqdn56vp3w6blnzdr5x.jpg"
          }
          alt={"s"}
          width={50}
          height={50}
        />
      </div>
      <div className="title">
        <p>რაიმე გემრიელი პროდუქტი</p>
      </div>
    </Link>
  );
}

export default SearchProductBox;
