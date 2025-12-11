export interface BaseModalProps {
  onClose: () => void;
}

export type ModalRenderer = (open: boolean, onClose: () => void) => React.ReactNode;
export interface ModalInstance {
  key: string;
  render: ModalRenderer;
}
