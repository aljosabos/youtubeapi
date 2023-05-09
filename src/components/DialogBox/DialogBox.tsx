import "./DialogBox.scss";
import { MaterialIcon } from "../../types/types";
import { renderIconBasedOnType } from "../../utils/utils";

interface IDialogBoxProps {
  icon?: MaterialIcon | "string";
  title: string;
  text: string;
  btn: JSX.Element;
}

export default function DialogBox({ icon, title, text, btn }: IDialogBoxProps) {
  return (
    <div className="DialogBox">
      {icon && renderIconBasedOnType(icon, "DialogBox__icon")}
      <h2 className="DialogBox__title">{title}</h2>
      <p className="DialogBox__text">{text}</p>
      {btn}
    </div>
  );
}
