import Box from "@mui/material/Box";
import MaterialModal from "@mui/material/Modal";
import { IModal } from "../../../types/types";
import "./Modal.scss";

export default function Modal({ open, closeModal, children }: IModal) {
  return (
    <div>
      <MaterialModal open={open} onClose={closeModal}>
        <Box className="Box">{children}</Box>
      </MaterialModal>
    </div>
  );
}
