import MaterialButton from "@mui/material/Button";
import "./Button.scss";
import { MaterialIcon } from "../../types/types";
import { renderIconBasedOnType } from "../../utils/utils";

interface IButtonProps {
  endIcon?: MaterialIcon | string;
  startIcon?: MaterialIcon | string;
  text?: string;
  className?: string;
  wrapperClassName?: string;
  disabled?: false;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined";
  onClick?: () => void;
}

export default function Button({ endIcon, startIcon, text, className, wrapperClassName, disabled, color, size, variant, onClick }: IButtonProps) {
  const centerIconClass = !text ? "centerIcon" : null;

  return (
    <div className={wrapperClassName}>
      <MaterialButton
        variant={variant ? variant : "contained"}
        endIcon={endIcon && renderIconBasedOnType(endIcon)}
        startIcon={startIcon && renderIconBasedOnType(startIcon)}
        className={`Button ${className} ${centerIconClass}`}
        disabled={disabled}
        color={color}
        size={size}
        onClick={onClick}
      >
        {text}
      </MaterialButton>
    </div>
  );
}
