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
  onChange?: (e: React.MouseEvent<HTMLLIElement>) => void;
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
  onChange,
  btnRef,
  className,
}: ISelectButtonProps) {
  const rootClass = className ? `SelectButton ${className}` : "SelectButton";

  return (
    <div className={rootClass} ref={btnRef}>
      <Button onClick={onClick} text={text} className="SelectButton__btn" startIcon={startIcon} endIcon={endIcon} />

      {showOptions && (
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
