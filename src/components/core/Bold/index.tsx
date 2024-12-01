import { CoreButton } from "..";
import { CoreButtonProps } from "@/components/types";
import { TextStyle } from "@/components/store/pdfGenSlice/types";
import { IconBold } from "@tabler/icons-react";
import { StyleUpdater } from "@/components/utils/hooks/useSelectionStyle";

interface BoldProps extends CoreButtonProps {
  textStyle: TextStyle;
  updateStyle: StyleUpdater;
}
export const Bold = ({ textStyle, updateStyle, ...rest }: BoldProps) => {
  return (
    <CoreButton
      active={textStyle.bold}
      onClick={() => {
        updateStyle(
          {
            fontWeight: "bold",
          },
          true
        );
      }}
      style={{ ...rest.style }}
    >
      <IconBold size={20} />
    </CoreButton>
  );
};
