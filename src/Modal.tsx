import { MutableRefObject, ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    const NewDiv = document.createElement("div");
    NewDiv.className =
      "fixed left-0 right-0 bottom-0 top-0 z-10 flex items-center justify-center bg-black bg-opacity-90 empty:hidden";
    elRef.current = NewDiv;
  } // THis is much faster since it is being handled by React virtual DOM, while calling direct DOM functions are super slow for performance

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) return;
    modalRoot.appendChild(elRef.current);

    return () => {
      if (elRef.current) modalRoot.removeChild(elRef.current);
    }; // Run after the component is unmounted from the dom
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
