import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { AUTH_SCOPE } from "../../data/constants";

export default function Header() {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("access_token", tokenResponse.access_token);
      setAccessToken(tokenResponse.access_token);
    },
    scope: AUTH_SCOPE,
  });

  const clearToken = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
  };

  return (
    <div className="Header">
      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" />
      <SearchBar />

      {!accessToken ? (
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
