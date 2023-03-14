import MaterialButton from "@mui/material/Button";
import "./Button.scss";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { Box } from "@mui/system";

interface IButtonProps {
  icon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  text: string;
  className?: string;
  wrapperClassName?: string;
}

export default function Button({
  icon,
  text,
  className,
  wrapperClassName,
}: IButtonProps) {
  return (
    <div className={wrapperClassName}>
      <MaterialButton
        variant="contained"
        endIcon={icon && <Box component={icon} sx={{ fontSize: "1.2rem" }} />}
        className={`Button ${className} }`}
      >
        {text}
      </MaterialButton>
    </div>
  );
}
