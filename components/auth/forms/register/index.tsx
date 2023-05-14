import Image from "next/image";
import Link from "next/link";
import googleIcon from "../../../../assets/icons/google.png";

function RegisterForm({ changeAuth }: { changeAuth: boolean }) {
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
      <form>
        {/* First Name */}
        <div className="animated_input">
          <input type="text" id="reg_firstName" placeholder=" " />
          <label htmlFor="reg_firstName">სახელი:</label>
        </div>
        {/* Last Name */}
        <div className="animated_input">
          <input type="text" id="reg_lastName" placeholder=" " />
          <label htmlFor="reg_lastName">გვარი:</label>
        </div>
        {/* Email */}
        <div className="animated_input">
          <input type="email" id="reg_email" placeholder=" " />
          <label htmlFor="reg_email">იმეილი:</label>
        </div>
        {/* Password */}
        <div className="animated_input">
          <input type="password" id="reg_password" placeholder=" " />
          <label htmlFor="reg_password">პაროლი:</label>
        </div>
        {/* Password Confirm */}
        <div className="animated_input">
          <input type="password" id="reg_passwordConfirm" placeholder=" " />
          <label htmlFor="reg_passwordConfirm">დაადასტურეთ პაროლი:</label>
        </div>
        <button type="submit" className="auth_button">
          რეგისტრაცია
        </button>
      </form>
    </article>
  );
}

export default RegisterForm;
