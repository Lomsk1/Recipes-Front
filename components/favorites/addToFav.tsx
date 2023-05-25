"use client";

import {
  createRecipeFavorite,
  deleteRecipeFavoriteApi,
} from "@/API/recipeFavorite/action";
import { axiosInstance } from "@/helper/axios";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import heartIcon from "../../assets/svg/heartEmpty.svg";
import heartFullIcon from "../../assets/svg/heartFull.svg";

interface PropsType {
  userData: {
    _id: string;
    favorites: {
      _id: string;
      recipe: string;
    }[];
    recipe: string;
  };
  recipeId: string;
}

async function getUserData() {
  const result = await axiosInstance(`api/v1/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}

function AddToFavorites({ userData, recipeId }: PropsType) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const [userFetch, setUserFetch] = useState<any>(null);
  useEffect(() => {
    const userData = async () => {
      const data = await getUserData();
      setUserFetch(data.data);
    };
    if (userData) userData();
  }, []);
  // Redux
  const dispatch = useAppDispatch();

  const handlerFunction = async () => {
    const data = await getUserData();
    setUserFetch(data.data);
  };

  return (
    <>
      {domLoaded && (
        <div className="add_to_favorite">
          {userFetch &&
          userFetch.data.favorites
            .map((data: PropsType["userData"]) => data.recipe)
            .includes(recipeId) ? (
            <>
              <p
                onClick={() =>
                  dispatch(
                    deleteRecipeFavoriteApi({
                      userId: userData._id,
                      recipeId: recipeId,
                    })
                  )
                    .unwrap()
                    .then(() => handlerFunction())
                }
                className="active"
              >
                ფავორიტებიდან წაშლა
              </p>
              <Image
                src={heartFullIcon}
                alt="favorite"
                width={20}
                height={20}
              />
            </>
          ) : (
            <>
              <p
                onClick={() =>
                  dispatch(
                    createRecipeFavorite({
                      user: userData._id,
                      recipeID: recipeId,
                    })
                  )
                    .unwrap()
                    .then(() => handlerFunction())
                }
              >
                ფავორიტებში დამატება
              </p>
              <Image src={heartIcon} alt="favorite" width={20} height={20} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AddToFavorites;
