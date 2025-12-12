import { atom } from "jotai"
import type { NewPost } from "../model/types"
import type { PostWithAuthor } from "../@x/with-user"

export const totalAtom = atom(0)
export const postsAtom = atom<PostWithAuthor[]>([])
export const selectedPostAtom = atom<PostWithAuthor | null>(null)
export const newPostAtom = atom<NewPost>({ title: "", body: "", userId: 1 })
export const showAddDialogAtom = atom(false)
export const showEditDialogAtom = atom(false)
export const showPostDetailDialogAtom = atom(false)
