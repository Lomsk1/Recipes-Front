import "../style/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { Noto_Serif_Georgian } from "@next/font/google";
import MainPageHeader from "@/components/navigation/header";
import { cookies } from "next/headers";

const Noto = Noto_Serif_Georgian({
  subsets: ["georgian"],
  display: "optional",
  variable: "--noto_georgian",
});

async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  return result.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();
  return (
    <html lang="en" className={`${Noto.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <Provider store={store}> */}
        <MainPageHeader userData={userData} />

        {children}
        {/* </Provider> */}
      </body>
    </html>
  );
}
