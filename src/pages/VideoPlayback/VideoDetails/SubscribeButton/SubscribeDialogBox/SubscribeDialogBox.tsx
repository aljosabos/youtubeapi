import { useTranslation } from "react-i18next";
import { useLogin } from "../../../../../hooks/useLogin";
import DialogBox from "../../../../../components/DialogBox/DialogBox";
import Button from "../../../../../components/Button/Button";
import "./SubscribeDialogBox.scss";

export default function SubscribeDialogBox() {
  const { login } = useLogin("/subscriptions");
  const { t } = useTranslation();
  return (
    <DialogBox
      title={t("dialogBox.subscribe.title")}
      text={t("dialogBox.subscribe.text")}
      btn={<Button text={t("dialogBox.subscribe.btn")} wrapperClassName="DialogBox__btn" onClick={login} variant="outlined" />}
      wrapperClassName="SubscribeDialogBox"
    />
  );
}
