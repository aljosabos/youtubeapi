import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MaterialModal from "@mui/material/Modal";
import { ReactNode } from "react";
import { IModal } from "../../../types/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modal({ open, closeModal, children }: IModal) {
  return (
    <div>
      <MaterialModal open={open} onClose={closeModal}>
        <Box sx={style}>
          {/* <Typography component="h2">Text in a modal</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {children}
        </Box>
      </MaterialModal>
    </div>
  );
}
