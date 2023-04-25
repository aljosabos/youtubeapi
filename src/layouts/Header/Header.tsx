import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AUTH_SCOPE } from "../../constants/endpointConstants";
import { useNavigate } from "react-router";
import { setTokenExpireTimeToLocalStorage } from "../../utils/utils";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPopover from "./SettingsPopover/SettingsPopover";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { useWindowResize } from "../../redux/hooks/useWindowResize";
import { X_LARGE_WIDTH } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { userInfoSelector } from "../../redux/slices/userInfoSlice";
import { getUserInfoThunk } from "../../redux/thunks/userInfoThunk";

interface IHeaderProps {
  handleLogout: () => void;
  toggleExpandDrawer: () => void;
}

export default function Header({ handleLogout, toggleExpandDrawer }: IHeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { t } = useTranslation();
  const { username, userAvatar } = useAppSelector(userInfoSelector);

  const { isResized } = useWindowResize(X_LARGE_WIDTH);

  const btnConfig = {
    signInText: isResized ? "" : t("header.btn.signIn"),
    signOutText: isResized ? "" : t("header.btn.signOut"),
    icon: isLoggedIn ? userAvatar : AccountCircleIcon,
  };

  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => {
      setTokenExpireTimeToLocalStorage(access_token, expires_in);
      setIsLoggedIn(true);
      dispatch(getUserInfoThunk(access_token));
    },
    scope: AUTH_SCOPE,
  });

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="Header">
      <span onClick={toggleExpandDrawer} className={"Header__menu"}>
        <MenuIcon className="Header__menu-icon" />
      </span>

      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" aria-label="logo" onClick={navigateToHome} />
      <SearchBar />

      {!isLoggedIn ? (
        <Button
          startIcon={btnConfig.icon}
          text={btnConfig.signInText}
          className="Header__btn"
          wrapperClassName="Header__btn-wrapper"
          onClick={login}
        />
      ) : (
        <Button
          startIcon={btnConfig.icon}
          text={btnConfig.signOutText}
          className="Header__btn"
          wrapperClassName="Header__btn-wrapper"
          onClick={handleLogout}
        />
      )}
      {!isResized && <SettingsPopover icon={SettingsIcon} username={username} userAvatar={userAvatar} />}
    </div>
  );
}
