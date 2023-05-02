"use client";

import MainPageHeader from "@/components/byIngredients/header";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Provider store={store}>
        <MainPageHeader />
        {children}
      </Provider>
    </section>
  );
}
