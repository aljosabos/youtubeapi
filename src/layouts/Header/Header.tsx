import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import YoutubeLogo from "../../images/youtube.png";
import SearchBar from "../../components/SearchBar/SearchBar";

function Header() {
  return (
    <div className="Header">
      <img src={YoutubeLogo} className="Header__logo" />
      <SearchBar />
      <Button
        startIcon={AccountCircleIcon}
        text="Sign in"
        className="Header__button"
      />
    </div>
  );
}

export default Header;
