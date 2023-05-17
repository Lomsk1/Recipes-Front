import { authRegister } from "@/API/auth/action";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import googleIcon from "../../../../assets/icons/google.png";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function RegisterForm({ changeAuth }: { changeAuth: boolean }) {
  const [cookies, setCookie] = useCookies(["jwt"]);

  const [errorMsg, setErrorMsg] = useState<{
    status: string;
    message: string;
  } | null>(null);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const validatePasswordConfirm = (value: string) => {
    const { password } = getValues();
    if (password !== value) {
      return "პაროლები არ ემთხვევა ერთმანეთს!";
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      authRegister({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    )
      .unwrap()
      .then((data: any) => {
        setCookie("jwt", data.token, {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        });
      })
      .catch((err: any) => {
        setErrorMsg(err);
      });
  };
  return (
    <article
      style={{
        left: changeAuth ? "-200%" : 0,
      }}
    >
      <h2>ანგარიშის შექმნა</h2>
      {/* Social */}
      <div className="social">
        <div className="box">
          <Image src={googleIcon} alt="google" width={30} height={30} />
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="animated_input">
          <input
            type="text"
            id="reg_firstName"
            placeholder=" "
            {...register("firstName", { required: true })}
          />
          <label htmlFor="reg_firstName">სახელი:</label>
        </div>
        {/* Last Name */}
        <div className="animated_input">
          <input
            type="text"
            id="reg_lastName"
            placeholder=" "
            {...register("lastName", { required: true })}
          />
          <label htmlFor="reg_lastName">გვარი:</label>
        </div>
        {/* Email */}
        <div className="animated_input">
          <input
            type="email"
            id="reg_email"
            placeholder=" "
            {...register("email", { required: true })}
          />
          <label htmlFor="reg_email">იმეილი:</label>
        </div>
        {/* Password */}
        <div className="animated_input">
          <input
            type="password"
            id="reg_password"
            placeholder=" "
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "პაროლი უნდა იყოს სულ მცირე 8 ასოსგან შემდგარი",
              },
            })}
          />
          <label htmlFor="reg_password">პაროლი:</label>
        </div>
        {errors.password && <span className="">{errors.password.message}</span>}
        {/* Password Confirm */}
        <div className="animated_input">
          <input
            type="password"
            id="reg_passwordConfirm"
            placeholder=" "
            {...register("passwordConfirm", {
              required: true,
              validate: validatePasswordConfirm,
            })}
          />
          <label htmlFor="reg_passwordConfirm">დაადასტურეთ პაროლი:</label>
        </div>
        {errors.passwordConfirm && (
          <span className="">{errors.passwordConfirm.message}</span>
        )}
        {errorMsg && errorMsg.status === "fail" && (
          <span>{errorMsg.message}</span>
        )}
        <button type="submit" className="auth_button">
          რეგისტრაცია
        </button>
      </form>
    </article>
  );
}

export default RegisterForm;
