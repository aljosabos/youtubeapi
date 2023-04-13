import MaterialButton from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { Box } from "@mui/system";
import "./Button.scss";
import { MaterialIcon } from "@material-ui/core";

interface IButtonProps {
  endIcon?: MaterialIcon;
  startIcon?: MaterialIcon;
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
        endIcon={endIcon && <Box component={endIcon} />}
        startIcon={startIcon && <Box component={startIcon} />}
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
