import * as React from "react"
import { forwardRef } from "react"
import { cva, VariantProps } from "class-variance-authority"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-gray-900",
      muted: "text-gray-500",
      primary: "text-blue-600",
      secondary: "text-gray-600",
      success: "text-green-600",
      warning: "text-yellow-600",
      destructive: "text-red-600",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    weight: "normal",
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: "span" | "p" | "div"
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant, size, weight, as = "span", children, ...props }, ref) => {
    const Component = as
    // ref는 as prop에 따라 타입이 달라질 수 있으므로 any로 처리
    return (
      <Component ref={ref as any} className={textVariants({ variant, size, weight, className })} {...props}>
        {children}
      </Component>
    )
  }
)
Text.displayName = "Text"

