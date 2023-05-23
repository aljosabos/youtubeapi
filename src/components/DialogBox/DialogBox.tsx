import "./DialogBox.scss";
import { MaterialIcon } from "../../types/types";
import { renderIconBasedOnType } from "../../utils/utils";

interface IDialogBoxProps {
  icon?: MaterialIcon | string;
  title?: string;
  text: string;
  btn?: JSX.Element;
  className?: string;
  alignItems?: "center" | "start";
  centerDialogBox?: boolean;
  disableShadow?: boolean;
}

export default function DialogBox({
  icon,
  title,
  text,
  btn,
  className,
  alignItems = "center",
  centerDialogBox = false,
  disableShadow = false,
}: IDialogBoxProps) {
  const alignItemsClass = alignItems === "start" ? "DialogBox--align-start" : "DialogBox--align-center";

  const centerDialogBoxClass = centerDialogBox ? "DialogBox--center-box" : null;

  const shadowClass = disableShadow ? null : "DialogBox--shadow";
  return (
    <div className={`DialogBox ${className} ${alignItemsClass} ${centerDialogBoxClass} ${shadowClass}`}>
      {icon && renderIconBasedOnType(icon, "DialogBox__icon")}
      <h2 className="DialogBox__title">{title}</h2>
      <p className="DialogBox__text">{text}</p>
      {btn}
    </div>
  );
}
