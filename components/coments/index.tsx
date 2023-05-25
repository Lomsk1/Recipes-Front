"use client";

import Image from "next/image";
import Link from "next/link";
import likeFullIcon from "../../assets/svg/likeFull_.svg";
import likeIcon from "../../assets/svg/like.svg";
import { useEffect } from "react";
import avatarIcon from "../../assets/icons/avatar.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCommentByRecipe } from "@/API/comment/action";
import {
  createCommentLikeApi,
  deleteCommentLikeApi,
} from "@/API/commentLike/action";
import CommentSendForm from "./form";
import CommentSkeletonLoading from "../skeletons/comment";

interface PropsTypes {
  commentData: {
    data: {
      _id: string;
      comment: string;
      user: {
        _id: string;
        firstName: string;
        avatar: {
          public_id: string;
          url: string;
        };
      };
      createdAt: Date;
      likes: {
        user: string;
        _id: number;
      }[];
    }[];
    status: string;
  };
  userData: {
    _id: string;
  } | null;
  recipeId: string;
}

function RecipeCommentSection({
  userData,
  recipeId,
}: {
  userData: PropsTypes["userData"];
  recipeId: PropsTypes["recipeId"];
}) {
  // Redux
  const dispatch = useAppDispatch();
  const {
    commentData,
  }: { isLoading: boolean; commentData: PropsTypes["commentData"] } =
    useAppSelector((state) => state.commentApi);

  // UseEffect for Comment Data
  useEffect(() => {
    dispatch(
      getCommentByRecipe({
        recipeID: recipeId,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  // Date Option
  const options: any = { month: "long", day: "numeric", year: "numeric" };

  return (
    <>
      {recipeId && (
        <section className="comment_section" id="comment_sec">
          <h2>კომენტარები</h2>
          {/* Form */}
          {<CommentSendForm userId={userData?._id} recipeId={recipeId} />}
          <hr />
          {/* Comment Section */}
          <aside>
            {/* Each comment */}
            {recipeId && commentData.status === "success" ? (
              commentData.data.length > 0 ? (
                commentData.data.map((data) => (
                  <div className="_box" key={data._id}>
                    <div className="user">
                      {data.user && (
                        <Image
                          src={
                            data.user.avatar
                              ? `${data.user.avatar.url}`
                              : `${avatarIcon}`
                          }
                          alt="avatar"
                          width={50}
                          height={50}
                        />
                      )}

                      {data.user && (
                        <Link href={`.../${data.user._id}`}>
                          {data.user.firstName}
                        </Link>
                      )}
                    </div>
                    <div className="date">
                      {data.createdAt && (
                        <p>
                          {new Date(data.createdAt).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </p>
                      )}
                    </div>
                    <div className="text">
                      <p>
                        {data.comment
                          ? data.comment
                          : "კომენტარი ვერ ჩაიტვირთა"}
                      </p>
                    </div>
                    <div className="actions">
                      {userData &&
                      data.likes &&
                      data.likes
                        .map((data) => data.user)
                        .includes(userData._id) ? (
                        <Image
                          src={likeFullIcon}
                          alt="like"
                          width={15}
                          height={15}
                          onClick={() => {
                            dispatch(
                              deleteCommentLikeApi({
                                userId: userData._id,
                                commentID: data._id,
                              })
                            )
                              .unwrap()
                              .then(() =>
                                dispatch(
                                  getCommentByRecipe({ recipeID: recipeId })
                                )
                              );
                          }}
                        />
                      ) : (
                        <Image
                          src={likeIcon}
                          alt="like"
                          width={15}
                          height={15}
                          onClick={() => {
                            if (userData) {
                              dispatch(
                                createCommentLikeApi({
                                  user: userData._id,
                                  comment: data._id,
                                })
                              )
                                .unwrap()
                                .then(() =>
                                  dispatch(
                                    getCommentByRecipe({ recipeID: recipeId })
                                  )
                                );
                            }
                          }}
                        />
                      )}
                      <p>{data.likes ? data.likes.length : 0}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="first_comment_popup">
                  იყავი პირველი კომენტარს ვინც გააკეთებს!
                </div>
              )
            ) : (
              <div>{<CommentSkeletonLoading />}</div>
            )}
          </aside>
        </section>
      )}
    </>
  );
}

export default RecipeCommentSection;
