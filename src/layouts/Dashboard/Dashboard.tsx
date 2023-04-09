import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { googleLogout } from "@react-oauth/google";
import { TOKEN_EXPIRE_TIME } from "../../constants/constants";
import { clearLocalStorage } from "../../utils/utils";

function Dashboard() {
  const location = useLocation();

  const currentTime = Date.now();
  const tokenExpireTime = Number(localStorage.getItem(TOKEN_EXPIRE_TIME));
  const tokenExpired = currentTime >= tokenExpireTime;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!tokenExpired);

  useEffect(() => {
    if (tokenExpired) {
      handleLogout();
      console.log("LOGOUT THE USER");
    }
  }, [location, tokenExpired]);

  const handleLogout = () => {
    googleLogout();
    clearLocalStorage();
    setIsLoggedIn(false);
  };

  return (
    <div className="Dashboard">
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header handleLogout={handleLogout} />
        <Sidebar />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default Dashboard;
