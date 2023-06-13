"use client";

import openEye from "../../assets/svg/visibility.svg";
import closeEye from "../../assets/svg/close-eye.svg";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PopupMiddle from "../popup/middle";
import { useAppDispatch } from "@/store/hooks";
import { passwordUpdate } from "@/API/auth/action";
import { useCookies } from "react-cookie";

interface FormValues {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

function UserPasswordChangeForm() {
  /* States */
  const [passwordCurrentShow, setPasswordCurrentShow] =
    useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmShow, setPasswordConfirmShow] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popupGoodIsShow, setPopupGoodIsShow] = useState<boolean>(false);
  const [popupBadIsShow, setPopupBadIsShow] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<string>("");

  /* Cookie Component*/
  const [cookies, setCookie] = useCookies();

  /* Redux Components*/
  const dispatch = useAppDispatch();

  ///////////////////////////////////////////////////////////////////////////
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      passwordUpdate({
        password: {
          passwordCurrent: data.passwordCurrent,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
      })
    )
      .unwrap()
      .then((data: any) => {
        setPopupGoodIsShow(true);
        setIsLoading(false);
        setCookie("jwt", data.token, {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        });
      })
      .catch((e) => {
        setIsLoading(false);
        setPopupBadIsShow(true);
        setResponseStatus(e.message);
      });

    setIsLoading(true);
  };

  return (
    <>
      <form className="password_change_form" onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <div className="password_input">
          <div
            className="icon"
            onClick={() => setPasswordCurrentShow(!passwordCurrentShow)}
          >
            <Image
              src={passwordCurrentShow ? openEye : closeEye}
              alt="eye"
              width={20}
              height={20}
            />
          </div>
          <input
            type={!passwordCurrentShow ? "password" : "text"}
            id="user_passwordCurrent"
            placeholder=" "
            {...register("passwordCurrent", {
              required: "მიუთითეთ არსებული პაროლი",
            })}
          />
          <label htmlFor="user_passwordCurrent">არსებული პაროლი</label>

          {errors.passwordCurrent?.message && (
            <span className="p_white">{errors.passwordCurrent?.message}</span>
          )}
        </div>

        {/* New Password */}
        <div className="password_input">
          <div className="icon" onClick={() => setPasswordShow(!passwordShow)}>
            <Image
              src={passwordShow ? openEye : closeEye}
              alt="eye"
              width={20}
              height={20}
            />
          </div>
          <input
            type={!passwordShow ? "password" : "text"}
            id="user_password"
            placeholder=" "
            {...register("password", {
              required: "მიუთითეთ ახალი პაროლი",
              minLength: {
                value: 8,
                message: "პაროლი უნდა შეიცავდეს 8 ან მეტ სიმბოლოს",
              },
            })}
          />
          <label htmlFor="user_password">ახალი პაროლი</label>

          {errors.password?.message && (
            <span className="p_white">{errors.password?.message}</span>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="password_input">
          <div
            className="icon"
            onClick={() => setPasswordConfirmShow(!passwordConfirmShow)}
          >
            <Image
              src={passwordConfirmShow ? openEye : closeEye}
              alt="eye"
              width={20}
              height={20}
            />
          </div>
          <input
            type={!passwordConfirmShow ? "password" : "text"}
            id="user_confirm_password"
            placeholder=" "
            {...register("passwordConfirm", {
              required: "გაიმეორეთ პაროლი",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "პაროლები არ ემთხვევა ერთმანეთს";
                }
              },
            })}
          />
          <label htmlFor="user_confirm_password">გაიმეორეთ ახალი პაროლი</label>

          {errors.passwordConfirm?.message && (
            <span className="p_white">{errors.passwordConfirm?.message}</span>
          )}
        </div>
        {/* Button */}
        <button type="submit">დადასტურება</button>
      </form>
      {popupGoodIsShow && (
        <PopupMiddle
          buttonName="დახურვა"
          statusResponse="პაროლი წარმატებით განახლდა"
          buttonFunction={() => {
            setPopupGoodIsShow(false);
            reset();
          }}
        />
      )}
      {popupBadIsShow && (
        <PopupMiddle
          buttonName="დახურვა"
          statusResponse={responseStatus}
          buttonFunction={() => {
            setPopupBadIsShow(false);
          }}
        />
      )}
    </>
  );
}

export default UserPasswordChangeForm;
