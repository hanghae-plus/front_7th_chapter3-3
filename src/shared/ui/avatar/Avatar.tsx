import * as React from "react"
import { forwardRef } from "react"
import { cva, VariantProps } from "class-variance-authority"

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs",
        default: "h-8 w-8 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, children, ...props }, ref) => {
    return (
      <div ref={ref} className={avatarVariants({ size, className })} {...props}>
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span className="flex items-center justify-center h-full w-full">
            {fallback || children}
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

