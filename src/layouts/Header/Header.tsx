import Button from "../../components/Button/Button";
import "./Header.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Header() {
  return (
    <div className="Header">
      <Button icon={AccountCircleIcon} text="Sign in" />
    </div>
  );
}

export default Header;
