import { create } from "zustand"
import { PostDialogSlice, createPostDialogSlice } from "./slices/postDialogSlice"
import { CommentDialogSlice, createCommentDialogSlice } from "./slices/commentDialogSlice"

type StoreState = PostDialogSlice & CommentDialogSlice

export const useStore = create<StoreState>()((...a) => ({
  ...createPostDialogSlice(...a),
  ...createCommentDialogSlice(...a),
}))
