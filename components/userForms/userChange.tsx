"use client";

import { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { userUpdate } from "@/API/auth/action";
import LoadingAnimation from "../loading/loading";
import PopupMiddle from "../popup/middle";
import avatarIcon from "../../assets/icons/avatar.png";

interface UserInfoTypes {
  userStatus: string;
  userData: {
    _id: string;
    avatar: {
      url: string;
    };
    firstName: string;
    lastName: string;
    email: string;
  };
}
type FormValues = {
  avatar: any;
  firstName: string;
  lastName: string;
  email: string;
};

function UserInfoChangeForm({ userStatus, userData }: UserInfoTypes) {
  /* States */
  const [changeable, setChangeable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popupShowGoodResponse, setPopupShowGoodResponse] =
    useState<boolean>(false);
  const [popupShowBadResponse, setPopupShowBadResponse] =
    useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<string>("");

  /* Redux for API */
  const dispatch = useAppDispatch();

  ///////////////////////////////////////////////////////////////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    if (data.firstName) formData.append("firstName", data.firstName);
    if (data.email) formData.append("email", data.email);
    if (data.lastName) formData.append("lastName", data.lastName);

    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    dispatch(
      userUpdate({
        userData: formData,
      })
    )
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setPopupShowGoodResponse(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setPopupShowBadResponse(true);
        setResponseStatus(err.message);
      });
    setIsLoading(true);
  };

  return (
    <div className="user_info_change_form">
      <button onClick={() => setChangeable(!changeable)}>
        ინფორმაციის ცვლილება
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Avatar */}
        <header>
          {userStatus === "success" ? (
            <div className="img">
              {userData.avatar ? (
                <Image
                  src={userData.avatar.url}
                  alt={"avatar"}
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={avatarIcon}
                  alt={"avatar"}
                  width={100}
                  height={100}
                />
              )}
            </div>
          ) : (
            <p>ფოტოს ჩატვირთვა ვერ მოხერხდა</p>
          )}
          {changeable && (
            <div className="input">
              <input type="file" {...register("avatar")} accept="image/*" />
            </div>
          )}
        </header>
        {/* First Name */}
        <div className="each">
          <h4>სახელი:</h4>
          {userStatus === "success" ? (
            <p>{userData.firstName}</p>
          ) : (
            <p>ინფორმაცია ვერ ჩაიტვირთა</p>
          )}
        </div>
        {changeable && (
          <div className="input">
            <input
              type="text"
              {...register("firstName")}
              placeholder="სახელი"
            />
          </div>
        )}
        {/* Last Name */}
        <div className="each">
          <h4>გვარი:</h4>
          {userStatus === "success" ? (
            <p>{userData.lastName}</p>
          ) : (
            <p>ინფორმაცია ვერ ჩაიტვირთა</p>
          )}
        </div>
        {changeable && (
          <div className="input">
            <input type="text" {...register("lastName")} placeholder="გვარი" />
          </div>
        )}
        {/* Email */}
        <div className="each">
          <h4>იმეილი:</h4>
          {userStatus === "success" ? (
            <p>{userData.email}</p>
          ) : (
            <p>ინფორმაცია ვერ ჩაიტვირთა</p>
          )}
        </div>
        {changeable && (
          <div className="input">
            <input type="email" {...register("email")} placeholder="იემილი" />
            <span className="p_white">
              {errors.email?.message && errors.email?.message}
            </span>
          </div>
        )}

        {/* Button */}
        {changeable && <button type="submit">შეცვლა</button>}
      </form>
      {isLoading && (
        <div className="loading_center">
          <LoadingAnimation />
        </div>
      )}
      {popupShowGoodResponse && (
        <PopupMiddle
          buttonName="დახურვა"
          statusResponse="ინფორმაცია წარმატებით განახლდა"
          buttonFunction={() => {
            setPopupShowGoodResponse(false);
            reset();
            location.reload();
          }}
        />
      )}
      {popupShowBadResponse && (
        <PopupMiddle
          buttonName="დახურვა"
          statusResponse={responseStatus}
          buttonFunction={() => {
            setPopupShowBadResponse(false);
            setResponseStatus("");
          }}
        />
      )}
    </div>
  );
}

export default UserInfoChangeForm;
