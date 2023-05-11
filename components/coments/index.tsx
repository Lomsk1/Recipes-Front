import Image from "next/image";
import Link from "next/link";
import avatarOne from "../../assets/images/avatar.webp";
import avatarTwo from "../../assets/images/avatar_1.webp";
import likeFullIcon from "../../assets/svg/likeFull_.svg";
import likeIcon from "../../assets/svg/like.svg";

function RecipeCommentSection() {
  return (
    <section className="comment_section">
        <h2>კომენტარები</h2>
      {/* Form */}
      <form className="main_form">
        <textarea placeholder="დაგვიტოვეთ შეტყობინება" />
        <button>დამატება</button>
      </form>

      <hr />
      {/* Sorting */}
      <div className="sorting">
        <select name="" id="">
          <option value="">ახლანდელი</option>
          <option value="">ძველი</option>
          <option value="">მოწონებებით</option>
        </select>
      </div>
      {/* Comment Section */}
      <aside>
        {/* Each comment */}
        <div className="_box">
          <div className="user">
            <Image src={avatarTwo} alt="avatar" width={50} height={50} />
            <Link href={"#"}>იზოლდა ამაჩუყელი</Link>
          </div>
          <div className="date">
            <p>დეკემბერი 10, 2020</p>
          </div>
          <div className="text">
            <p>ძალიან კარგი რამეა. ყველამ სცადეთ, არ ინანებთ</p>
          </div>
          <div className="actions">
            <Image src={likeIcon} alt="like" width={15} height={15} />
            <p>2</p>
          </div>
        </div>

        <div className="_box">
          <div className="user">
            <Image src={avatarTwo} alt="avatar" width={50} height={50} />
            <Link href={"#"}>იზოლდა ამაჩუყელი</Link>
          </div>
          <div className="date">
            <p>დეკემბერი 10, 2020</p>
          </div>
          <div className="text">
            <p>ძალიან კარგი რამეა. ყველამ სცადეთ, არ ინანებთ</p>
          </div>
          <div className="actions">
            <Image src={likeIcon} alt="like" width={15} height={15} />
            <p>2</p>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default RecipeCommentSection;
