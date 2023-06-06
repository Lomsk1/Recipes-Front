"use client";

import { setUserSidebarToggle } from "@/redux/client/sidebar/slice";
import { useAppDispatch } from "@/store/hooks";

function UserSidebarBurger() {
  const dispatch = useAppDispatch();

  return (
    <div className="userSidebarBurger">
      <label htmlFor="check__">
        <input
          type="checkbox"
          id="check__"
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setUserSidebarToggle(true));
            } else {
              dispatch(setUserSidebarToggle(false));
            }
          }}
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
}

export default UserSidebarBurger;
