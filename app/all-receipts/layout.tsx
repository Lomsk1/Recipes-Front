"use client";

import { store } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

async function getUserData() {
  const token = Cookies.get("jwt") || null;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!result.ok) return null;

  return result.json();
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userFetch, setUserFetch] = useState<any>(null);

  useEffect(() => {
    if (Cookies.get("jwt")) {
      const userData = async () => {
        const data = await getUserData();
        setUserFetch(data);
      };

      if (userData) userData();
    }
  }, []);
  return (
    <section>
      <Provider store={store}>
        {children}
      </Provider>
    </section>
  );
}
