import { MaterialIcon } from "../../types/types";
import Button from "../Button/Button";
import "./SelectButton.scss";

interface ISelectButtonProps {
  endIcon?: MaterialIcon | string;
  startIcon?: MaterialIcon | string;
  text?: string;
  value?: string;
  onClick?: () => void;
  items: Array<{ name: string; value: string }>;
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
  items,
  expandOptions = false,
  onChange,
  elementRef,
}: ISelectButtonProps) {
  return (
    <div className="SelectButton" ref={elementRef}>
      <Button onClick={onClick} text={text} className="SelectButton__btn" startIcon={startIcon} endIcon={endIcon} />

      {expandOptions && (
        <ul className="SelectButton__options">
          {items.map(({ name, value }, index) => (
            <li onClick={onChange} key={index} className="SelectButton__option" data-value={value}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
