import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useGoogleLogin } from "@react-oauth/google";

export default function Header() {
  const handleSignIn = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className="Header">
      <img src={YoutubeLogo} className="Header__logo" alt="youtube_logo" />
      <SearchBar />
      <Button
        startIcon={AccountCircleIcon}
        text="Sign in"
        className="Header__button"
        onClick={handleSignIn}
      />
    </div>
  );
}
