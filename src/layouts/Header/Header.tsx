import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { AUTH_SCOPE } from "../../data/constants";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      localStorage.setItem("access_token", access_token);
      setIsLoggedIn(true);
    },
    scope: AUTH_SCOPE,
  });

  const clearToken = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  return (
    <div className="Header">
      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" />
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
