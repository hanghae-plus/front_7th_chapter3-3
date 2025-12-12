import { atom } from "jotai"
import type { Comment, NewComment } from "./types"

export const commentsAtom = atom<Record<string, Comment[]>>({})
export const selectedCommentAtom = atom<Comment | null>(null)
export const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
export const showAddCommentDialogAtom = atom(false)
export const showEditCommentDialogAtom = atom(false)
