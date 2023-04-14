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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="Popover">
      <span onClick={handleOpen} className="Popover__icon" aria-describedby={id}>
        {renderIconBasedOnType(icon)}
      </span>

      <MaterialPopover
        id={id}
        open={open}
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
        className="Popover__content"
      >
        <Typography sx={{ p: 2 }}>{children}</Typography>
      </MaterialPopover>
    </div>
  );
}
