"use client";
import UserSidebarForMobile from "@/components/userDashboardSidebar/mobile";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function UserDashboardSideProvider({
  userID,
  role,
}: {
  userID: string;
  role: string;
}) {
  return (
    <>
      <Provider store={store}>
        <UserSidebarForMobile userID="" role="" />
      </Provider>
    </>
  );
}

export default UserDashboardSideProvider;
