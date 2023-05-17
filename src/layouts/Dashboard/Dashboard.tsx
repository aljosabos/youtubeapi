import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { googleLogout } from "@react-oauth/google";
import { TOKEN_EXPIRE_TIME, X_LARGE_WIDTH } from "../../constants/constants";
import { removeAccessTokenAndExpireTime } from "../../utils/utils";
import { useAppSelector } from "../../hooks/reduxHooks";
import { languageSelector } from "../../redux/slices/settingsSlice";
import i18n from "../../i18n";
import Drawer from "../Drawer/Drawer";
import { useWindowResize } from "../../hooks/useWindowResize";
import { ModalContext } from "../../context/ModalContext";
import Modal from "./Modal/Modal";

function Dashboard() {
  const location = useLocation();
  const currentLanguage = useAppSelector(languageSelector);
  const { isResized } = useWindowResize(X_LARGE_WIDTH);

  const currentTime = Date.now();
  const tokenExpireTime = Number(localStorage.getItem(TOKEN_EXPIRE_TIME));
  const tokenExpired = currentTime >= tokenExpireTime;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!tokenExpired);
  const [shouldExpandDrawer, setShouldExpandDrawer] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const rootClass = shouldExpandDrawer ? "Dashboard--drawer-expanded" : "Dashboard";

  useEffect(() => {
    if (currentLanguage) i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (tokenExpired) {
      handleLogout();
    }
  }, [location, tokenExpired]);

  useEffect(() => {
    if (isResized) setShouldExpandDrawer(false);
  }, [isResized]);

  const handleLogout = () => {
    googleLogout();
    removeAccessTokenAndExpireTime();
    setIsLoggedIn(false);
  };

  const toggleExpandDrawer = () => {
    setShouldExpandDrawer((previousState) => !previousState);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={rootClass}>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ModalContext.Provider value={{ openModal, setOpenModal }}>
          <Header handleLogout={handleLogout} toggleExpandDrawer={toggleExpandDrawer} />
          <Drawer shouldExpandDrawer={shouldExpandDrawer} />
          <Outlet />
          <Modal open={openModal} closeModal={closeModal} />
        </ModalContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default Dashboard;
