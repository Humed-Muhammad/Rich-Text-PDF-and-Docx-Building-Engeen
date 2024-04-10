import { CoreButton } from "..";
import { CoreButtonProps } from "@/components/types";
import { TextStyle } from "@/components/store/pdfGenSlice/types";
import { IconBold } from "@tabler/icons-react";

interface BoldProps extends CoreButtonProps {
  textStyle: TextStyle;
}
export const Bold = ({ textStyle, ...rest }: BoldProps) => {
  return (
    <CoreButton
      active={textStyle.bold}
      onClick={() => document.execCommand("bold")}
      style={{ ...rest.style }}
    >
      <IconBold size={20} />
    </CoreButton>
  );
};
