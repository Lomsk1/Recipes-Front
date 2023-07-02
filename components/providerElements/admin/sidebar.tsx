"use client";

import AdminNavigationForMobile from "@/components/admin/sidebar/mobileNav";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function AdminSidebarMobileProvider({ userID }: { userID: string }) {
  return <Provider store={store}>
    <AdminNavigationForMobile userID={userID} />
  </Provider>;
}

export default AdminSidebarMobileProvider;
