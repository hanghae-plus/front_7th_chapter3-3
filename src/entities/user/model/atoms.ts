import { atom } from "jotai"
import type { User } from "./types"

export const usersAtom = atom<User[]>([])
export const selectedUserAtom = atom<User | null>(null)
export const showUserInfoAtom = atom(false)
