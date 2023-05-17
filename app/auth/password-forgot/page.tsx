"use client";

import mailBoxIcon from "../../../assets/icons/mailbox.png";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosUnAuthorized } from "@/helper/axios";
import { useState } from "react";
import PopupMiddle from "@/components/popup/middle";
import LoadingAnimation from "@/components/loading/loading";

interface FormValues {
  email: string;
}

export default function PasswordForgotPage() {
  const [responseMsg, setResponseMsg] = useState<{
    status: string;
    message: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axiosUnAuthorized
      .post("api/v1/users/forgotPassword", {
        email: data.email,
      })
      .then(function (response) {
        setResponseMsg(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setResponseMsg(error.response.data);
      });
    setIsLoading(true);
  };
  return (
    <section className="password_forgot_section">
      <main>
        <header>
          <Image src={mailBoxIcon} alt="mailbox" width={60} height={60} />
        </header>
        <h1>დაგავიწყდათ პაროლი?</h1>
        <p>
          გთხოვთ მიუთითოთ თქვენი იმეილი. <br /> პაროლის აღდგენის ინსტრუქციას
          გამოგიგზავნით მითითებულ იმეილზე.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="animated_input">
            <input
              type="mail"
              id="password_forgot"
              placeholder=" "
              {...register("email", { required: true })}
            />
            <label htmlFor="password_forgot">იმეილი</label>
          </div>
          {responseMsg?.status === "fail" && <span>{responseMsg.message}</span>}
          <button type="submit" className="auth_button">
            გაგზავნა
          </button>
        </form>
      </main>
      {responseMsg && responseMsg.status === "success" && (
        <PopupMiddle
          buttonFunction={() => {
            setResponseMsg(null);
            reset();
          }}
          buttonName="დახურვა"
          statusResponse={responseMsg.message}
        />
      )}

      {/* Loading */}
      {isLoading && (
        <div className="loader_container">
          <LoadingAnimation />
        </div>
      )}
    </section>
  );
}
