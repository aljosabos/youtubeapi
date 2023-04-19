import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { googleLogout } from "@react-oauth/google";
import { TOKEN_EXPIRE_TIME } from "../../constants/constants";
import { removeAccessTokenAndExpireTime } from "../../utils/utils";
import { useAppSelector } from "../../redux/hooks/hooks";
import { languageSelector } from "../../redux/slices/settingsSlice";
import i18n from "../../i18n";
import Drawer from "../../components/Drawer/Drawer";

function Dashboard() {
  const location = useLocation();
  const currentLanguage = useAppSelector(languageSelector);

  const currentTime = Date.now();
  const tokenExpireTime = Number(localStorage.getItem(TOKEN_EXPIRE_TIME));
  const tokenExpired = currentTime >= tokenExpireTime;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!tokenExpired);
  const [shouldExpandDrawer, setShouldExpandDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (currentLanguage) i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (tokenExpired) {
      handleLogout();
    }
  }, [location, tokenExpired]);

  const handleLogout = () => {
    googleLogout();
    removeAccessTokenAndExpireTime();
    setIsLoggedIn(false);
  };

  const toggleExpandDrawer = () => {
    setShouldExpandDrawer((previousState) => !previousState);
  };

  return (
    <div className="Dashboard">
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />
        <Drawer shouldExpandDrawer={shouldExpandDrawer} />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default Dashboard;
