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
import Drawer from "../../components/Drawer/Drawer";

interface IHeaderProps {
  handleLogout: () => void;
}

export default function Header({ handleLogout }: IHeaderProps) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setTokenExpireTimeToLocalStorage(response.access_token, response.expires_in);
      setIsLoggedIn(true);
    },
    scope: AUTH_SCOPE,
  });

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="Header">
      <Drawer />

      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" aria-label="logo" onClick={navigateToHome} />
      <SearchBar />

      {!isLoggedIn ? (
        <Button
          startIcon={AccountCircleIcon}
          text={t("header.btn.signIn") || ""}
          className="Header__btn"
          wrapperClassName="Header__btn-wrapper"
          onClick={login}
        />
      ) : (
        <Button
          startIcon={AccountCircleIcon}
          text={t("header.btn.signOut") || ""}
          className="Header__btn"
          wrapperClassName="Header__btn-wrapper"
          onClick={handleLogout}
        />
      )}
      <SettingsPopover icon={SettingsIcon} />
    </div>
  );
}
