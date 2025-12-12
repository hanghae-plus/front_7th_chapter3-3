import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { forwardRef } from "react"

interface Option {
  value: string | number
  label: string
}

interface SelectBoxProps {
  value?: string | number
  onValueChange?: (value: string) => void
  placeholder?: string
  options?: Option[]
  className?: string
  disabled?: boolean
  // 확장을 위한 children 허용 (커스텀 아이템 등)
  children?: React.ReactNode
}

export const SelectBox = forwardRef<HTMLButtonElement, SelectBoxProps>(
  ({ value, onValueChange, placeholder, options, className, disabled, children }, ref) => {
    return (
      <Select value={value?.toString()} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger ref={ref} className={className} style={{ width: '180px' }}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
          {/* 옵션 외에 추가적인 커스텀 요소가 필요할 경우 children으로 렌더링 */}
          {children}
        </SelectContent>
      </Select>
    )
  },
)

SelectBox.displayName = "SelectBox"
