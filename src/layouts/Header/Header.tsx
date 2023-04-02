import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AUTH_SCOPE } from "../../constants/endpoints";
import { useNavigate } from "react-router";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: ({ access_token, expires_in }) => {
      localStorage.setItem("access_token", access_token);
      const tokenExpireTime = Date.now() + expires_in * 1000;
      localStorage.setItem("token_expire_time", tokenExpireTime.toString());
      setIsLoggedIn(true);
    },
    scope: AUTH_SCOPE,
  });

  const clearToken = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expire_time");

    setIsLoggedIn(false);
  };

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
        <Button
          startIcon={AccountCircleIcon}
          text="Sign out"
          className="Header__button"
          onClick={() => {
            googleLogout();
            clearToken();
          }}
        />
      )}
    </div>
  );
}
