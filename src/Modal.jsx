import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  } // THis is much faster since it is being handled by React virtual DOM, while calling direct DOM functions are super slow for performance

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current); // Run after the component is unmounted from the dom
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
