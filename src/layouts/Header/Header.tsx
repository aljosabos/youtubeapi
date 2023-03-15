import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Header() {
  return (
    <div className="Header">
      <Button
        startIcon={AccountCircleIcon}
        // text="Sign in"
        className="Header_button"
        color="secondary"
      />
    </div>
  );
}

export default Header;
