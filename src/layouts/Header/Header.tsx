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
import Popover from "../../components/Popover/Popover";
import SettingsIcon from "@mui/icons-material/Settings";


interface IHeaderProps {
  handleLogout: () => void;
}

export default function Header({ handleLogout }: IHeaderProps) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => {
      setTokenExpireTimeToLocalStorage(access_token, expires_in);
      setIsLoggedIn(true);
    },
    scope: AUTH_SCOPE,
  });

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="Header">
      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" aria-label="logo" onClick={navigateToHome} />
      <SearchBar />

      {!isLoggedIn ? (
        <Button startIcon={AccountCircleIcon} text="Sign in" className="Header__btn" wrapperClassName="Header__btn-wrapper" onClick={login} />
      ) : (
        <Button startIcon={AccountCircleIcon} text="Sign out" className="Header__btn" onClick={handleLogout} />
      )}
      <Popover icon={SettingsIcon}>This is the content</Popover>
    </div>
  );
}
