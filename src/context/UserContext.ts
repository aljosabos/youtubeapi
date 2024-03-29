import { createContext } from "react";

export interface IUserContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext({} as IUserContextProps);
