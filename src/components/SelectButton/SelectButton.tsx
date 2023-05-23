import { useRef, useState } from "react";
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
  showOptions?: boolean;
  onChangeOption?: (e: React.MouseEvent<HTMLLIElement>) => void;
  btnRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

export default function SelectButton({
  endIcon,
  startIcon,
  text,
  value,
  onClick,
  options,
  showOptions = false,
  onChangeOption,
  btnRef,
  className,
}: ISelectButtonProps) {
  const rootClass = className ? `SelectButton ${className}` : "SelectButton";

  const selectRef = useRef<HTMLSelectElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => {
    onClick && onClick();
    setIsOpen(!isOpen);
    if (!isOpen && selectRef.current) {
      selectRef.current.classList.add("open");
    } else {
      if (selectRef.current) selectRef.current.classList.remove("open");
    }
  };

  return (
    <div className={rootClass} ref={btnRef}>
      <Button onClick={handleBtnClick} text={text} className="SelectButton__btn" startIcon={startIcon} endIcon={endIcon} />

      {showOptions && (
        <ul className="SelectButton__options">
          {options.map(({ name, value, icon }, index) => (
            <li onClick={onChangeOption} key={index} className="SelectButton__option" data-value={value}>
              {renderIconBasedOnType(icon, "SelectButton__option-icon")}
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
