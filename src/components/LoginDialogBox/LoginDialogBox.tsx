import Button from "../Button/Button";
import DialogBox from "../DialogBox/DialogBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogin } from "../../redux/hooks/useLogin";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import "./LoginDialogBox.scss";

export default function LoginDialogBox() {
  const { login } = useLogin("/subscriptions");
  return (
    <DialogBox
      icon={VideoLibraryIcon}
      title="Don’t miss new videos"
      text="Sign in to see updates from your favorite YouTube channels."
      btn={<Button text="Sign in" startIcon={AccountCircleIcon} onClick={login} variant="outlined" wrapperClassName="LoginDialogBox__btn" />}
    />
  );
}
