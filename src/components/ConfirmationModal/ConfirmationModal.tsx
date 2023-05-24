import Modal from "../../layouts/Dashboard/Modal/Modal";
import Button from "../Button/Button";
import "./ConfirmationModal.scss";

interface IConfirmationModalProps {
  open: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  title: string;
}

export default function ConfirmationModal({ open, closeModal, onConfirm, title }: IConfirmationModalProps) {
  return (
    <div className="ConfirmationModal">
      <Modal open={open} closeModal={closeModal} >
        <p>Unsubscribe from {title}?</p>
        <div className="ConfirmationModal__buttons">
          <Button text="Cancel" onClick={closeModal} variant="text" />
          <Button text="Unsubscribe" onClick={onConfirm} variant="text" />
        </div>
      </Modal>
    </div>
  );
}
