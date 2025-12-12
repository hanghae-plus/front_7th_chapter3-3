import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"

interface AppRouterProps {
  children: ReactNode
}

const Router = ({ children }: AppRouterProps) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

export default Router
