"use client";

import { authLogin } from "@/API/auth/action";
import LoadingAnimation from "@/components/loading/loading";
import { setMessage } from "@/redux/client/popup/slice";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import googleIcon from "../../../../assets/icons/google.png";

interface FormValues {
  email: string;
  password: string;
}

function LoginForm({ changeAuth }: { changeAuth: boolean }) {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<{
    status: string;
    message: string;
  } | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(
      authLogin({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then((data: any) => {
        dispatch(setMessage("თქვენ წარმატებით გაიარეთ ავტორიზაცია"));
        setCookie("jwt", data.token, {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        });
        setIsLoading(false);
      })
      .catch((err: any) => {
        setErrorMsg(err);
        setIsLoading(false);
      });
      setIsLoading(true)
  };
  return (
    <article
      style={{
        right: !changeAuth ? "-200%" : 0,
      }}
    >
      <h2>ავტორიზაცია</h2>
      {/* Social */}
      <div className="social">
        <div className="box">
          <Image src={googleIcon} alt="google" width={30} height={30} />
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="animated_input">
          <input
            type="email"
            id="log_email"
            placeholder=" "
            {...register("email", { required: true })}
          />
          <label htmlFor="log_email">იმეილი:</label>
        </div>
        {/* Password */}
        <div className="animated_input">
          <input
            type="password"
            id="log_password"
            placeholder=" "
            {...register("password", { required: true })}
          />
          <label htmlFor="log_password">პაროლი:</label>
        </div>
        {errorMsg?.status === "fail" && <span>{errorMsg.message}</span>}
        <Link href={"auth/password-forgot"}>დაგავიწყდა პაროლი?</Link>
        <button type="submit" className="auth_button">
          ავტორიზაცია
        </button>
      </form>
      {/* Loading */}
      {isLoading && (
        <div className="loader_container">
          <LoadingAnimation />
        </div>
      )}
    </article>
  );
}

export default LoginForm;
