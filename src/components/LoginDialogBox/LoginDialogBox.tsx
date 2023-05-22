import Button from "../Button/Button";
import DialogBox from "../DialogBox/DialogBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogin } from "../../hooks/useLogin";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import "./LoginDialogBox.scss";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function LoginDialogBox() {
  const { login } = useLogin();
  const { t } = useTranslation();
  return (
    <DialogBox
      icon={VideoLibraryIcon}
      title={t("dialogBox.login.large.title")}
      text={t("dialogBox.login.large.text")}
      btn={
        <Button
          text={t("dialogBox.login.large.btn")}
          startIcon={AccountCircleIcon}
          onClick={login}
          variant="outlined"
          wrapperClassName="LoginDialogBox__btn"
        />
      }
    />
  );
}
