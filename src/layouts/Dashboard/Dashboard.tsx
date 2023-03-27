import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Dashboard.scss";
import { useState } from "react";
import { createContext } from "react";

interface IUserContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(localStorage.getItem("access_token")));

  return (
    <div className="Dashboard">
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header />
        <Sidebar />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default Dashboard;
export const UserContext = createContext({} as IUserContextProps);
