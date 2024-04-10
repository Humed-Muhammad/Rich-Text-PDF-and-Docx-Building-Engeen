import { CoreButton } from "..";
import { CoreButtonProps } from "@/components/types";
import { TextStyle } from "@/components/store/pdfGenSlice/types";
import { IconUnderline } from "@tabler/icons-react";

interface BoldProps extends CoreButtonProps {
  textStyle: TextStyle;
}
export const Underline = ({ textStyle, ...rest }: BoldProps) => {
  return (
    <CoreButton
      active={textStyle.underLine}
      onClick={() => document.execCommand("underline")}
      style={{ marginLeft: 10, ...rest.style }}
    >
      <IconUnderline size={20} />
    </CoreButton>
  );
};
