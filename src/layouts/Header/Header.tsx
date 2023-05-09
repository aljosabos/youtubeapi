import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPopover from "./SettingsPopover/SettingsPopover";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { useWindowResize } from "../../hooks/useWindowResize";
import { X_LARGE_WIDTH } from "../../constants/constants";
import { useAppSelector } from "../../hooks/reduxHooks";
import { userInfoSelector } from "../../redux/slices/userInfoSlice";
import { useLogin } from "../../hooks/useLogin";

interface IHeaderProps {
  handleLogout: () => void;
  toggleExpandDrawer: () => void;
}

export default function Header({ handleLogout, toggleExpandDrawer }: IHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { username, userAvatar } = useAppSelector(userInfoSelector);
  const { isResized } = useWindowResize(X_LARGE_WIDTH);

  const { login, isLoggedIn } = useLogin();

  const btnConfig = {
    signInText: isResized ? "" : t("header.btn.signIn"),
    signOutText: isResized ? "" : t("header.btn.signOut"),
    icon: isLoggedIn ? userAvatar : AccountCircleIcon,
  };

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
      {!isResized && <SettingsPopover icon={SettingsIcon} username={username} userAvatar={userAvatar} isLoggedIn={isLoggedIn} />}
    </div>
  );
}
