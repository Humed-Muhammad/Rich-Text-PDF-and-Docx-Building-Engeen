import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextStyleType } from "@/components/utils/constants";

import { EditableContentArea } from "@/components/types";

interface Props extends EditableContentArea {
  value: string;
  options: Array<TextStyleType>;
  onSelect: (value: Partial<CSSStyleDeclaration> | string) => void;
  label: string;
}
export function TextStyleSelector({ value, options, onSelect, label }: Props) {
  return (
    <Select onValueChange={(value) => onSelect(value)} value={value}>
      <SelectTrigger className="w-[180px] bg-white mx-1 focus:ring-0 border border-gray-200">
        <SelectValue placeholder="Select a Style" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map(({ label, value }) => (
            <SelectItem key={label} value={value as string}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
