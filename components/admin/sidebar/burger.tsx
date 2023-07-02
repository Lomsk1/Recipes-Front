"use client";

import { setAdminSidebarToggle } from "@/redux/client/sidebar/slice";
import { useAppDispatch } from "@/store/hooks";

function AdminSidebarBurger() {
  const dispatch = useAppDispatch();

  return (
    <div className="adminSidebarBurger">
      <label htmlFor="check__">
        <input
          type="checkbox"
          id="check__"
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setAdminSidebarToggle(true));
            } else {
              dispatch(setAdminSidebarToggle(false));
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

export default AdminSidebarBurger;
