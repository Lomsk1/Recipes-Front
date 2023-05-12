"use client";

import Image from "next/image";
import Link from "next/link";
import avatarOne from "../../assets/images/avatar.webp";
import avatarTwo from "../../assets/images/avatar_1.webp";
import likeFullIcon from "../../assets/svg/likeFull_.svg";
import likeIcon from "../../assets/svg/like.svg";
import { Suspense, useEffect, useState } from "react";

interface PropsTypes {
  commentData: {
    _id: string;
    comment: string;
    user: {
      _id: string;
      firstName: string;
      avatar: {
        name: string;
        destination: string;
        data: Buffer;
      };
    };
    createdAt: Date;
    like: {
      users: string[];
      amount: number;
    };
  }[];
}

function RecipeCommentSection({ commentData }: PropsTypes) {
  const [sortValue, setSortValue] = useState<string>("new");
  const [sortedData, setSortedData] =
    useState<PropsTypes["commentData"]>(commentData);

  useEffect(() => {
    let sorted = sortedData.map((comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
    }));
    if (sortValue === "new") {
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortValue === "old") {
      sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (sortValue === "like") {
      sorted.sort((a, b) => b.like.amount - a.like.amount);
    }
    setSortedData(sorted);
  }, [sortValue]);

  const options: any = { month: "long", day: "numeric", year: "numeric" };

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
        <select
          name=""
          id=""
          onChange={(e) => {
            setSortValue(e.target.value);
          }}
        >
          <option value="new">ახლანდელი</option>
          <option value="old">ძველი</option>
          <option value="like">მოწონებებით</option>
        </select>
      </div>
      {/* Comment Section */}
      <aside>
        {/* Each comment */}
        {sortedData && sortedData.length > 0 ? (
          sortedData.map((data) => (
            <div className="_box" key={data._id}>
              <div className="user">
                {/* <Image
                  src={`${process.env.NEXT_PUBLIC_DB_HOST}/${data.user.avatar.destination}/${data.user.avatar.name}`}
                  alt="avatar"
                  width={50}
                  height={50}
                /> */}
                <Link href={`.../${data.user._id}`}>{data.user.firstName}</Link>
              </div>
              <div className="date">
                <p>
                  {new Date(data.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
              </div>
              <div className="text">
                <p>{data.comment}</p>
              </div>
              <div className="actions">
                <Image src={likeIcon} alt="like" width={15} height={15} />
                <p>{data.like.amount}</p>
              </div>
            </div>
          ))
        ) : (
          <div>...Loading</div>
        )}
      </aside>
    </section>
  );
}

export default RecipeCommentSection;
