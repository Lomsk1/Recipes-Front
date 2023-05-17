"use client";

import LoadingAnimation from "@/components/loading/loading";
import PopupMiddle from "@/components/popup/middle";
import { axiosUnAuthorized } from "@/helper/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  password: string;
  passwordConfirm: string;
}

export default function PasswordConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const [responseMsg, setResponseMsg] = useState<{
    status: string;
    message: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axiosUnAuthorized
      .patch(`api/v1/users/resetPassword/${params.id}`, {
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      .then(function (response) {
        setResponseMsg(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setResponseMsg(error.response.data);
        setIsLoading(false);
      });
    setIsLoading(true);
  };

  const validatePasswordConfirm = (value: string) => {
    const { password } = getValues();
    if (password !== value) {
      return "პაროლები არ ემთხვევა ერთმანეთს!";
    }
  };

  return (
    <>
      <section className="password_confirm_section">
        <main>
          <header>
            <h1>გთხოვთ შეიყვვანოთ ახალი პაროლი</h1>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="animated_input">
              <input
                type="password"
                id="new_password"
                placeholder=" "
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "პაროლი უნდა იყოს სულ მცირე 8 ასოსგან შემდგარი",
                  },
                })}
              />
              <label htmlFor="new_password">პაროლი</label>
            </div>
            {errors.password && (
              <span className="">{errors.password.message}</span>
            )}
            <div className="animated_input">
              <input
                type="password"
                id="Re_new_password"
                placeholder=" "
                {...register("passwordConfirm", {
                  required: true,
                  validate: validatePasswordConfirm,
                })}
              />
              <label htmlFor="re_new_password">გაიმეორეთ პაროლი</label>
            </div>
            {errors.passwordConfirm && (
              <span>{errors.passwordConfirm.message}</span>
            )}
            {responseMsg?.status === "fail" && (
              <span>{responseMsg.message}</span>
            )}
            <button type="submit" className="auth_button">
              შეცვლა
            </button>
          </form>
        </main>
      </section>
      {responseMsg && responseMsg.status === "success" && (
        <PopupMiddle
          buttonFunction={() => {
            setResponseMsg(null);
            reset();
            // router.push('/')
          }}
          buttonName="დახურვა"
          statusResponse={"პაროლის აღდგენა წარმატებით დასრულდა!"}
        />
      )}
      {/* Loading */}
      {isLoading && (
        <div className="loader_container">
          <LoadingAnimation />
        </div>
      )}
    </>
  );
}
