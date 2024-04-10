import { CoreButton } from "..";
import { CoreButtonProps } from "@/components/types";
import { TextStyle } from "@/components/store/pdfGenSlice/types";
import { IconItalic } from "@tabler/icons-react";

interface BoldProps extends CoreButtonProps {
  textStyle: TextStyle;
}
export const Italic = ({ textStyle, ...rest }: BoldProps) => {
  return (
    <CoreButton
      active={textStyle.italic}
      onClick={() => document.execCommand("italic")}
      style={{ marginLeft: 10, ...rest.style }}
    >
      <IconItalic size={20} />
    </CoreButton>
  );
};
