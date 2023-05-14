"use client";

import { authLogin } from "@/API/auth/action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import googleIcon from "../../../../assets/icons/google.png";

interface FormValues {
  email: string;
  password: string;
}

function LoginForm({ changeAuth }: { changeAuth: boolean }) {
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const authRedux: any = useAppSelector((state) => state.auth);

  // console.log(authRedux);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      authLogin({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then((data: any) => console.log(data))
      .catch((err: any) => setErrorStatus(err.response.status));
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
        {errorStatus === 401 && <span>იმეილი ან პაროლი არასწორია!</span>}
        <Link href={""}>დაგავიწყდა პაროლი?</Link>
        <button type="submit" className="auth_button">
          ავტორიზაცია
        </button>
      </form>
    </article>
  );
}

export default LoginForm;
