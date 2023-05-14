"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import googleIcon from "../../assets/icons/google.png";
import LoginForm from "@/components/auth/forms/login";
import RegisterForm from "@/components/auth/forms/register";

export default function AuthPage() {
  const [changeAuth, setChangeAuth] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <section className="auth_page_section">
        <main>
          <aside
            style={{
              left: changeAuth && width > 600 ? "calc(50% + 5px)" : "5px",
              top: changeAuth && width <= 600 ? "calc(65% + 5px)" : "5px",
            }}
          >
            {/* For Login */}
            <article
              style={{
                left: changeAuth ? "-200%" : 0,
              }}
            >
              <h1>კეთილი იყოს თქვენი დაბრუნება!</h1>
              <p>
                თუ გსურთ თქვენს გვერდზე გადასვლა, გთხოვთ გაიაროთ ავტორიზაცია
              </p>
              <button onClick={() => setChangeAuth(!changeAuth)}>
                ავტორიზაცია
              </button>
            </article>
            {/* For Registration */}
            <article
              style={{
                right: !changeAuth ? "-200%" : 0,
              }}
            >
              <h1>მოგესალმები!</h1>
              <p>თუ არ გაქვთ ანგარიში შექმნილი, გთხოვთ გაიაროთ რეგისტრაცია</p>
              <button onClick={() => setChangeAuth(!changeAuth)}>
                რეგისტრაცია
              </button>
            </article>
          </aside>
          <aside
            style={{
              right: changeAuth && width > 600 ? "calc(50% + 5px)" : "5px",
              bottom: changeAuth && width <= 600 ? "calc(35% + 5px)" : "5px",
            }}
          >
            {/* Registration */}
            <RegisterForm changeAuth={changeAuth} />

            {/* Authorization */}
            <LoginForm changeAuth={changeAuth} />
          </aside>
        </main>
      </section>
    </>
  );
}
