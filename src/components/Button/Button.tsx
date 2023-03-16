import MaterialButton from "@mui/material/Button";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { Box } from "@mui/system";
import "./Button.scss";

interface IButtonProps {
  endIcon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  startIcon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  text?: string;
  className?: string;
  wrapperClassName?: string;
  disabled?: false;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
}

export default function Button({
  endIcon,
  startIcon,
  text,
  className,
  wrapperClassName,
  disabled,
  color,
  size,
}: IButtonProps) {
  const centerIconClass = !text ? "centerIcon" : null;
  return (
    <div className={wrapperClassName}>
      <MaterialButton
        variant="contained"
        endIcon={endIcon && <Box component={endIcon} />}
        startIcon={startIcon && <Box component={startIcon} />}
        className={`Button ${className} ${centerIconClass}`}
        disabled={disabled}
        color={color}
        size={size}
      >
        {text}
      </MaterialButton>
    </div>
  );
}
