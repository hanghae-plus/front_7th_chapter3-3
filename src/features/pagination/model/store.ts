import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface PaginationState {
  skip: number
  limit: number

  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  prevPage: () => void
  reset: () => void
}

export const usePaginationStore = create<PaginationState>()(
  devtools(
    (set) => ({
      skip: 0,
      limit: 10,

      setSkip: (skip) => set({ skip }),
      setLimit: (limit) => set({ limit, skip: 0 }),
      nextPage: () => set((state) => ({ skip: state.skip + state.limit })),
      prevPage: () => set((state) => ({ skip: Math.max(0, state.skip - state.limit) })),
      reset: () => set({ skip: 0, limit: 10 }),
    }),
    { name: "pagination-store" },
  ),
)
