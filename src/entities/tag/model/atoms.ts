import { atom } from "jotai"
import type { Tag } from "./types"

export const tagsAtom = atom<Tag[]>([])
export const selectedTagAtom = atom("")
