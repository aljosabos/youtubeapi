import { createContext } from "react";

export interface IModalContextProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext({} as IModalContextProps);
