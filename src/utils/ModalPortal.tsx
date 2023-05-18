import ReactDOM from "react-dom";
import { ReactNode } from "react";

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const portalRoot = document.getElementById("modal-root");

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
};
