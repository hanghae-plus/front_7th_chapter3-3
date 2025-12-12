import { create } from "zustand/react"

interface Dialog {
  type: string | null
  id: number | null
}

interface DialogContext {
  dialogs: Dialog[]
}

interface DialogActions {
  setDialog: (dialog: Dialog) => void
  resetDialog: () => void
}

interface DialogState {
  context: DialogContext
  actions: DialogActions
}

const initialContext: DialogContext = {
  dialogs: [],
}

const useDialog = create<DialogState>((set) => ({
  context: {
    ...initialContext,
  },
  actions: {
    setDialog: (dialog) => set(({ context }) => ({ context: { ...context, dialogs: [...context.dialogs, dialog] } })),
    resetDialog: () =>
      set(({ context }) => ({
        context: {
          ...context,
          dialogs: context.dialogs.slice(0, -1),
        },
      })),
  },
}))

export const useDialogContext = () => useDialog(({ context }) => context)
export const useDialogActions = () => useDialog(({ actions }) => actions)
