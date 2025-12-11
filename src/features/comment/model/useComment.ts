import { useContext } from "react"
import { CommentContext, type CommentContextValue } from "./CommentContext"

export const useComment = (): CommentContextValue => {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider")
  }
  return context
}
