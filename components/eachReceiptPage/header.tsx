import Image from "next/image";
import AddToFavorites from "../favorites/addToFav";
import ReviewComponent from "../review";
import MakeReview from "../review/make";

interface ApiTypes {
  name: string;
  _id: string;
  author: {
    _id: string;
    firstName: string;
  };
  createdAt: Date;
  image: {
    public_id: string;
    url: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  review: {
    user: string;
  }[];
  userData: {
    _id: string;
    favorites: {
      _id: string;
      recipe: string;
    }[];
    recipe: string;
  } | null;
}

function EachRecipeHeader({
  name,
  author,
  createdAt,
  image,
  userData,
  _id,
  ratingsAverage,
  ratingsQuantity,
  review,
}: ApiTypes) {
  const date = new Date(createdAt);
  const options: any = { month: "long", day: "numeric", year: "numeric" };
  const changedDate = date.toLocaleDateString("ka-GE", options);

  return (
    <section className="each_receipt_title">
      {/* information */}
      <aside>
        <h1>{name && name}</h1>
        <h3>ავტორი: {author ? author.firstName : "უცნობი"}</h3>
        <h4>{changedDate && changedDate}</h4>

        {/* Add to Favorites */}
        {userData && _id && (
          <AddToFavorites recipeId={_id} userData={userData} />
        )}

        {/* Reviews */}
        <ReviewComponent
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
        />
        {userData &&
        _id &&
        review &&
        !review.map((data) => data.user).includes(userData?._id) ? (
          <MakeReview userID={userData._id} recipeID={_id} />
        ) : (
          ""
        )}
        {/* Comment Read */}
        <a href="#comment_sec">კომენტარების წაკითხვა</a>
      </aside>
      {/* Image */}
      <aside>
        <Image
          src={`${image.url}`}
          alt={name ? name : "სურათი"}
          className="re"
          width={1000}
          height={1000}
        />
      </aside>
    </section>
  );
}

export default EachRecipeHeader;
