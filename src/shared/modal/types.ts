export interface BaseModalProps {
  onClose: () => void;
}

export type ModalRenderer = (onClose: () => void) => React.ReactNode;
export interface ModalInstance {
  key: string;
  render: ModalRenderer;
}
