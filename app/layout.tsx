import "../style/main.scss";
import 'react-loading-skeleton/dist/skeleton.css'

import { Noto_Serif_Georgian } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";

const Noto = Noto_Serif_Georgian({
  subsets: ["georgian"],
  display: "optional",
  variable: "--noto_georgian",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${Noto.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <Provider store={store}> */}
          {children}
          {/* </Provider> */}
      </body>
    </html>
  );
}
