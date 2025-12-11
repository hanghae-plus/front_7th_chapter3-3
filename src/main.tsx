import ReactDOM from "react-dom/client"
import App from "./app/routers/App" // 경로 주의
import { QueryProvider } from "./app/providers/QueryProvider"
import "./app/styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <App />
  </QueryProvider>,
)
