import { AlertCircle } from "lucide-react"
import { getErrorMessage } from "../model/error"
import { Button } from "./Button"

interface ErrorDisplayProps {
  error: unknown
  onRetry?: () => void
  className?: string
}

export const ErrorDisplay = ({ error, onRetry, className = "" }: ErrorDisplayProps) => {
  const message = getErrorMessage(error)

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  )
}
