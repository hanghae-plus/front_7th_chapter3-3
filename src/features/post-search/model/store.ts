import { atom } from "jotai"

export const searchQueryAtom = atom<string>("")
export const selectedTagAtom = atom<string>("")
export const sortByAtom = atom<string>("")
export const sortOrderAtom = atom<"asc" | "desc">("asc")
export const paginationAtom = atom({
  skip: 0,
  limit: 10,
})
