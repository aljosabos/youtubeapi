import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

function Dashboard() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(localStorage.getItem("access_token")));

  useEffect(() => {
    const current_time = Date.now();
    const tokenExpireTime = localStorage.getItem("token_expire_time");
    console.log("CURRENT TIME: " + current_time);
    console.log("EXPIRE TIME: " + Number(tokenExpireTime));

    console.log(current_time < Number(tokenExpireTime));
    console.log(Math.floor((Number(tokenExpireTime) - current_time) / 1000));
  }, [location]);

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
