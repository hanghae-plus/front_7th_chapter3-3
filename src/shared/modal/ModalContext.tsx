import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ModalInstance, ModalRenderer } from "./types";
import ModalRoot from "./ModalRoot";

interface ModalContextValue {
  openModal: (renderer: ModalRenderer) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalInstance | null>(null);

  const openModal = useCallback((renderer: ModalRenderer) => {
    setActiveModal({
      key: crypto.randomUUID(),
      render: renderer,
    });
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalContext value={value}>
      {children}
      <ModalRoot activeModal={activeModal} closeModal={closeModal} />
    </ModalContext>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
