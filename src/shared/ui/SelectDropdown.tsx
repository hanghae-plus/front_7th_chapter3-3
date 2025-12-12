import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./primitives";

interface SelectDropdownProps {
  options: { key?: string; label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SelectDropdown({ options, value, onChange, placeholder }: SelectDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.key || option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
