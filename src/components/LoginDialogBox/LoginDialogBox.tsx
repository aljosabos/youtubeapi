import Button from "../Button/Button";
import DialogBox from "../DialogBox/DialogBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogin } from "../../hooks/useLogin";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import "./LoginDialogBox.scss";
import { useTranslation } from "react-i18next";

export default function LoginDialogBox() {
  const { login } = useLogin("/subscriptions");
  const { t } = useTranslation();
  return (
    <DialogBox
      icon={VideoLibraryIcon}
      title={t("loginDialogBox.title")}
      text={t("loginDialogBox.text")}
      btn={
        <Button
          text={t("loginDialogBox.btn")}
          startIcon={AccountCircleIcon}
          onClick={login}
          variant="outlined"
          wrapperClassName="LoginDialogBox__btn"
        />
      }
    />
  );
}
