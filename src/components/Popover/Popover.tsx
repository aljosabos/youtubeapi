import { Popover as MaterialPopover, Typography } from "@mui/material";
import { useState, ReactNode } from "react";
import "./Popover.scss";
import { renderIconBasedOnType } from "../../utils/utils";
import { MaterialIcon } from "../../types/types";

export interface IPopoverProps {
  children?: ReactNode;
  icon: MaterialIcon | string;
}

export default function Popover({ children, icon }: IPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  return (
    <div className="Popover">
      <span onClick={handleOpen} className="Popover__icon" aria-describedby={id}>
        {renderIconBasedOnType(icon, "Button__icon")}
      </span>

      <MaterialPopover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="Popover__material-popover"
      >
        <Typography component="span">{children}</Typography>
      </MaterialPopover>
    </div>
  );
}
