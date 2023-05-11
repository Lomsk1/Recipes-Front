import Image from "next/image";
import Link from "next/link";
import heartIcon from "../../assets/svg/heartEmpty.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";
import testImage from "../../assets/images/test.jpg";
import ReviewComponent from "../review";

interface ApiTypes {
  name: string;
  author: {
    _id: string;
    firstName: string;
  };
  createdAt: Date;
  image: {
    name: string;
    destination: string;
  };
}

function EachRecipeHeader({ name, author, createdAt, image }: ApiTypes) {
  const date = new Date(createdAt);
  const options: any = { month: "long", day: "numeric", year: "numeric" };
  const changedDate = date.toLocaleDateString("ka-GE", options);

  return (
    <section className="each_receipt_title">
      {/* information */}
      <aside>
        <h1>{name}</h1>
        <h3>ავტორი: {author.firstName}</h3>
        <h4>{changedDate && changedDate}</h4>

        <div className="favorite">
          <p>ფავორიტებში დამატება</p>
          <Image src={heartIcon} alt="favorite" width={20} height={20} />
        </div>
        <ReviewComponent />
        <Link href="#">კომენტარების წაკითხვა</Link>
      </aside>
      {/* Image */}
      <aside>
        <Image
          src={`${process.env.NEXT_PUBLIC_DB_HOST}/${image.destination}/${image.name}`}
          alt={name}
          className="re"
          width={1000}
          height={1000}
        />
      </aside>
    </section>
  );
}

export default EachRecipeHeader;
