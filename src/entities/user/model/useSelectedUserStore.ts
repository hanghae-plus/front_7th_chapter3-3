import { create } from "zustand"

interface SelectedUserStore {
  selectedUserId: number | null
  setSelectedUserId: (userId: number) => void
}

const useSelectedUserStore = create<SelectedUserStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (userId: number) => set({ selectedUserId: userId }),
}))

export default useSelectedUserStore
