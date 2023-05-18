import { MaterialIcon } from "../../types/types";
import { renderIconBasedOnType } from "../../utils/utils";
import Button from "../Button/Button";
import "./SelectButton.scss";

interface ISelectButtonProps {
  endIcon?: MaterialIcon | string;
  startIcon?: MaterialIcon | string;
  text?: string;
  value?: string;
  onClick?: () => void;
  options: Array<{ name: string; value: string; icon: MaterialIcon }>;
  expandOptions?: boolean;
  onChange?: (e: React.MouseEvent<HTMLLIElement>) => void;
  elementRef?: React.RefObject<HTMLDivElement>;
}

export default function SelectButton({
  endIcon,
  startIcon,
  text,
  value,
  onClick,
  options,
  expandOptions = false,
  onChange,
  elementRef,
}: ISelectButtonProps) {
  return (
    <div className="SelectButton" ref={elementRef}>
      <Button onClick={onClick} text={text} className="SelectButton__btn" startIcon={startIcon} endIcon={endIcon} />

      {expandOptions && (
        <ul className="SelectButton__options">
          {options.map(({ name, value, icon }, index) => (
            <li onClick={onChange} key={index} className="SelectButton__option" data-value={value}>
              {renderIconBasedOnType(icon, "SelectButton__option-icon")}
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
