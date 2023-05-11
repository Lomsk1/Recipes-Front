"use client";

import MainPageHeader from "@/components/navigation/header";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Provider store={store}>
        {children}
      </Provider>
    </section>
  );
}
