import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui";
import { BaseModalProps } from "./types";

interface ModalComponentProps extends BaseModalProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
}

export default function ModalComponent({ title, onClose, children }: ModalComponentProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
