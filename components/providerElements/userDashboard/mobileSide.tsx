'use client'
import UserSidebarForMobile from "@/components/userDashboardSidebar/mobile";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function UserDashboardSideProvider() {
    return ( 
        <>
        <Provider store={store}>
            <UserSidebarForMobile />
        </Provider>
        </>
     );
}

export default UserDashboardSideProvider;