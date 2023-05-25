"use client";
import Image from "next/image";
import starIcon from "../../assets/svg/star.svg";
import starFullIcon from "../../assets/icons/starFull.png";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { makeRecipeReview } from "@/API/receipt/action";

interface ImageHoverTypes {
  first: boolean;
  second: boolean;
  third: boolean;
  forth: boolean;
  fifth: boolean;
}

function MakeReview({
  userID,
  recipeID,
}: {
  userID: string;
  recipeID: string;
}) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const [imageHover, setImageHover] = useState<ImageHoverTypes>({
    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
  });
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <>
      {domLoaded ? (
        <>
          <div className="make_review">
            <header>
              <h4 onClick={() => setShow(!show)}>შეფასების გაკეთება</h4>
            </header>
            <main>
              {show && (
                <>
                  <Image
                    onMouseEnter={() =>
                      setImageHover({
                        first: true,
                        second: false,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onMouseLeave={() =>
                      setImageHover({
                        first: false,
                        second: false,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onClick={() =>
                      dispatch(
                        makeRecipeReview({
                          rating: 1,
                          recipe: recipeID,
                          user: userID,
                        })
                      )
                        .unwrap()
                        .then(() => location.reload())
                    }
                    src={imageHover.first ? starFullIcon : starIcon}
                    alt="star"
                    width={15}
                    height={15}
                  />
                  <Image
                    onMouseEnter={() =>
                      setImageHover({
                        first: true,
                        second: true,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onMouseLeave={() =>
                      setImageHover({
                        first: false,
                        second: false,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onClick={() =>
                      dispatch(
                        makeRecipeReview({
                          rating: 2,
                          recipe: recipeID,
                          user: userID,
                        })
                      )
                        .unwrap()
                        .then(() => location.reload())
                    }
                    src={imageHover.second ? starFullIcon : starIcon}
                    alt="star"
                    width={15}
                    height={15}
                  />
                  <Image
                    onMouseEnter={() =>
                      setImageHover({
                        first: true,
                        second: true,
                        third: true,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onMouseLeave={() =>
                      setImageHover({
                        first: false,
                        second: false,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onClick={() =>
                      dispatch(
                        makeRecipeReview({
                          rating: 3,
                          recipe: recipeID,
                          user: userID,
                        })
                      )
                        .unwrap()
                        .then(() => location.reload())
                    }
                    src={imageHover.third ? starFullIcon : starIcon}
                    alt="star"
                    width={15}
                    height={15}
                  />
                  <Image
                    onMouseEnter={() =>
                      setImageHover({
                        first: true,
                        second: true,
                        third: true,
                        forth: true,
                        fifth: false,
                      })
                    }
                    onMouseLeave={() =>
                      setImageHover({
                        first: false,
                        second: false,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onClick={() =>
                      dispatch(
                        makeRecipeReview({
                          rating: 4,
                          recipe: recipeID,
                          user: userID,
                        })
                      )
                        .unwrap()
                        .then(() => location.reload())
                    }
                    src={imageHover.forth ? starFullIcon : starIcon}
                    alt="star"
                    width={15}
                    height={15}
                  />
                  <Image
                    onMouseEnter={() =>
                      setImageHover({
                        first: true,
                        second: true,
                        third: true,
                        forth: true,
                        fifth: true,
                      })
                    }
                    onMouseLeave={() =>
                      setImageHover({
                        first: false,
                        second: false,
                        third: false,
                        forth: false,
                        fifth: false,
                      })
                    }
                    onClick={() =>
                      dispatch(
                        makeRecipeReview({
                          rating: 5,
                          recipe: recipeID,
                          user: userID,
                        })
                      )
                        .unwrap()
                        .then(() => location.reload())
                    }
                    src={imageHover.fifth ? starFullIcon : starIcon}
                    alt="star"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </main>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default MakeReview;
