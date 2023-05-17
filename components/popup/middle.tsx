import { MouseEventHandler } from "react";
import { RemoveScroll } from "react-remove-scroll";

function PopupMiddle({
  statusResponse,
  buttonFunction,
  buttonName,
}: {
  statusResponse: string;
  buttonFunction: MouseEventHandler;
  buttonName: string;
}) {
  return (
    <>
      <div className={"popup_middle"}>
        <RemoveScroll>
          <div className="text_cont">
            <div>
              <p>{statusResponse}</p>
            </div>
            <button onClick={buttonFunction}>{buttonName}</button>
          </div>
        </RemoveScroll>
      </div>
    </>
  );
}

export default PopupMiddle;
