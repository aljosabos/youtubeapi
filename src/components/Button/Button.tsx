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
  text: string;
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
}

export default function Button({
  endIcon,
  startIcon,
  text,
  className,
  wrapperClassName,
  disabled,
  color,
}: IButtonProps) {
  return (
    <div className={wrapperClassName}>
      <MaterialButton
        variant="contained"
        endIcon={endIcon && <Box component={endIcon} />}
        startIcon={endIcon && <Box component={startIcon} />}
        className={`Button ${className}`}
        disabled={disabled}
        color={color}
      >
        {text}
      </MaterialButton>
    </div>
  );
}
