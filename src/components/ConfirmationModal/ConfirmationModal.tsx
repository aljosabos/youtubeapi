import Modal from "../../layouts/Dashboard/Modal/Modal";
import Button from "../Button/Button";

interface IConfirmationModalProps {
  open: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({ open, closeModal, onConfirm }: IConfirmationModalProps) {
  return (
    <Modal open={open} closeModal={closeModal}>
      <p>Are u sure u want to unsubscribe?</p>
      <Button text="Cancel" onClick={closeModal} />
      <Button text="Unsubscribe" onClick={onConfirm} />
    </Modal>
  );
}
