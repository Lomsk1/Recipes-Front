"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/auth/forms/login";
import RegisterForm from "@/components/auth/forms/register";
import PopupMiddle from "@/components/popup/middle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMessage } from "@/redux/client/popup/slice";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import CookingLoader from "@/components/loading/cooking";

export default function AuthPage() {
  const [changeAuth, setChangeAuth] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(0);
  const router = useRouter();
  const [cookie] = useCookies(["jwt"]);

  const userGuard = async () => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.jwt}`,
        },
      }
    );
    if (!result.ok) setIsAuth(false);

    return result;
  };

  useEffect(() => {
    if (cookie.jwt) {
      userGuard()
        .then((result) => {
          if (result.status === 200) router.push("/auth/user-dashboard");
        })
        .catch((error) => {
          setIsAuth(false);
        });
    } else {
      setIsAuth(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();
  const popupRedux: { message: string | null } = useAppSelector(
    (state) => state.popupClient
  );

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
      {!isAuth ? (
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
                  <p>
                    თუ არ გაქვთ ანგარიში შექმნილი, გთხოვთ გაიაროთ რეგისტრაცია
                  </p>
                  <button onClick={() => setChangeAuth(!changeAuth)}>
                    რეგისტრაცია
                  </button>
                </article>
              </aside>
              <aside
                style={{
                  right: changeAuth && width > 600 ? "calc(50% + 5px)" : "5px",
                  bottom:
                    changeAuth && width <= 600 ? "calc(35% + 5px)" : "5px",
                }}
              >
                {/* Registration */}
                <RegisterForm changeAuth={changeAuth} />

                {/* Authorization */}
                <LoginForm changeAuth={changeAuth} />
              </aside>
            </main>
          </section>
          {/* Popup for Messages */}

          {popupRedux && popupRedux.message && (
            <PopupMiddle
              buttonName="დახურვა"
              statusResponse={popupRedux.message}
              buttonFunction={() => {
                dispatch(setMessage(null));
                router.push("/auth/user-dashboard");
              }}
            />
          )}
        </>
      ) : (
        <div className="loader_container_100">
          <CookingLoader />
        </div>
      )}
    </>
  );
}
