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
import { ACCESS_TOKEN, TOKEN_EXPIRE_TIME } from "../../constants/constants";

interface IHeaderProps {
  handleLogout: () => void;
}

export default function Header({ handleLogout }: IHeaderProps) {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => {
      localStorage.setItem(ACCESS_TOKEN, access_token);
      const tokenExpireTime = Date.now() + expires_in * 1000;
      localStorage.setItem(TOKEN_EXPIRE_TIME, tokenExpireTime.toString());
      setIsLoggedIn(true);
    },
    scope: AUTH_SCOPE,
  });

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="Header">
      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" onClick={navigateToHome} />
      <SearchBar />

      {!isLoggedIn ? (
        <Button startIcon={AccountCircleIcon} text="Sign in" className="Header__button" onClick={login} />
      ) : (
        <Button startIcon={AccountCircleIcon} text="Sign out" className="Header__button" onClick={handleLogout} />
      )}
    </div>
  );
}
