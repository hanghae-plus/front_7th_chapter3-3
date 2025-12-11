import { useContext } from "react"
import { PostContext, type PostContextValue } from "./PostContext"

export const usePost = (): PostContextValue => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error("usePost must be used within a PostProvider")
  }
  return context
}
