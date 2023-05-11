"use client";

import MainSideBar from "@/components/sidebar/main";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function ByIngredientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="main_layout">
      <Provider store={store}>
        <MainSideBar />
        {children}
      </Provider>
    </section>
  );
}
