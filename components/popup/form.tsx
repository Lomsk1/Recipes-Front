import { ReactNode, MouseEventHandler } from "react";

import { RemoveScroll } from "react-remove-scroll";

function PopupForm({
  children,
  closeFunction,
}: {
  children: ReactNode;
  closeFunction: MouseEventHandler;
}) {
  return (
    <>
      <div className="popup_form">
        <button onClick={closeFunction} className='close_button'>დახურვა</button>
        <RemoveScroll>{children}</RemoveScroll>
      </div>
    </>
  );
}

export default PopupForm;
