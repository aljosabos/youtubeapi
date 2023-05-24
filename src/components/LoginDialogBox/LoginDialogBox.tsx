import Button from "../Button/Button";
import DialogBox from "../DialogBox/DialogBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogin } from "../../hooks/useLogin";
import "./LoginDialogBox.scss";
import { useTranslation } from "react-i18next";
import { MaterialIcon } from "../../types/types";
import { RefObject } from "react";

interface ILoginDialogBoxProps {
  title: string;
  text: string;
  icon?: MaterialIcon | string;
  className?: string;
  alignItems?: "center" | "start";
  centerDialogBox?: boolean;
  disableShadow?: boolean;
  callback?: () => void;
  elementRef?: RefObject<HTMLDivElement>;
}

export default function LoginDialogBox({
  title,
  text,
  icon,
  className,
  alignItems = "center",
  centerDialogBox,
  disableShadow,
  callback,
  elementRef,
}: ILoginDialogBoxProps) {
  const { login } = useLogin(undefined, callback);
  const { t } = useTranslation();

  return (
    <DialogBox
      icon={icon}
      title={title}
      text={text}
      className={className}
      btn={
        <Button
          text={t("dialogBox.login.large.btn")}
          startIcon={AccountCircleIcon}
          onClick={login}
          variant="outlined"
          wrapperClassName="LoginDialogBox__btn"
        />
      }
      alignItems={alignItems}
      centerDialogBox={centerDialogBox}
      disableShadow={disableShadow}
      elementRef = {elementRef}
    />
  );
}
