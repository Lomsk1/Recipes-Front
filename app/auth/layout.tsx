"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Provider store={store}>{children}</Provider>
    </section>
  );
}
