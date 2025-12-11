import { useContext } from "react"
import { UserContext, type UserContextValue } from "./UserContext"

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

