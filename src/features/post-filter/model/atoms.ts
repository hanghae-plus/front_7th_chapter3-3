import { atom } from "jotai"

export const searchQueryAtom = atom<string>("")
export const sortAtom = atom<string>("")
export const orderAtom = atom<"asc" | "desc">("asc")
export const skipAtom = atom<number>(0)
export const limitAtom = atom<number>(10)
