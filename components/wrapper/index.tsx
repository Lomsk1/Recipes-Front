import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

function WrapperContainer(props: {
  visible: boolean;
  close: Function;
  children: React.ReactNode;
}) {
  const { visible, close, children } = props;
  const wrapperRef = useRef(null);

  const handleClickOutside = () => {
    close();
  };

  useOnClickOutside(wrapperRef, handleClickOutside);
  return (
    <>
      {visible && (
        <div ref={wrapperRef} className="_wrapper">
          {children}
        </div>
      )}
    </>
  );
}

export default WrapperContainer;
