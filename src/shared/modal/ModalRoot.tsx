import { ModalInstance } from "./types";

interface ModalRootProps {
  activeModal: ModalInstance | null;
  closeModal: () => void;
}

export default function ModalRoot({ activeModal, closeModal }: ModalRootProps) {
  if (!activeModal) return null;

  return activeModal.render(closeModal);
}
