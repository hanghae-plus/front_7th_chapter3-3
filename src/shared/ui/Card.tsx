import { HTMLAttributes } from "react"

type CardProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className = "", ...props }: CardProps) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
)

type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const CardHeader = ({ className = "", ...props }: CardHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

export const CardTitle = ({ className = "", ...props }: CardTitleProps) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
)

type CardContentProps = HTMLAttributes<HTMLDivElement>

export const CardContent = ({ className = "", ...props }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)
