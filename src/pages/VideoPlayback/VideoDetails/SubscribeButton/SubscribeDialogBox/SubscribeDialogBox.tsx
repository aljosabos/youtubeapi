import { useTranslation } from "react-i18next";
import DialogBox from "../../../../../components/DialogBox/DialogBox";
import Button from "../../../../../components/Button/Button";
import "./SubscribeDialogBox.scss";

interface ISubscribeDialogBoxProps {
  onClick: () => void;
}

export default function SubscribeDialogBox({ onClick }: ISubscribeDialogBoxProps) {
  const { t } = useTranslation();
  return (
    <DialogBox
      title={t("dialogBox.subscribe.title")}
      text={t("dialogBox.subscribe.text")}
      btn={<Button text={t("dialogBox.subscribe.btn")} wrapperClassName="DialogBox__btn" onClick={onClick} variant="outlined" />}
      wrapperClassName="SubscribeDialogBox"
    />
  );
}
