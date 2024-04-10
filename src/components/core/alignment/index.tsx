import { SideBarProps } from "@/components/types";

import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
} from "@tabler/icons-react";
import { CoreButton } from "..";
import { styleAlignmentUsingExeCommand } from "@/components/utils";

export const Alignment = ({ textStyle, focusedData }: SideBarProps) => {
  return (
    <div className="pdfx-flex">
      <CoreButton
        onClick={() =>
          styleAlignmentUsingExeCommand({
            alignment: "left",
            focusedData,
            value: textStyle.textAlignment!,
          })
        }
        active={textStyle.textAlignment === "left"}
      >
        <IconAlignLeft size={20} />
      </CoreButton>
      <CoreButton
        onClick={() =>
          styleAlignmentUsingExeCommand({
            alignment: "center",
            focusedData,
            value: textStyle.textAlignment!,
          })
        }
        active={textStyle.textAlignment === "center"}
      >
        <IconAlignCenter size={20} />
      </CoreButton>
      <CoreButton
        onClick={() => {
          styleAlignmentUsingExeCommand({
            alignment: "right",
            focusedData,
            value: textStyle.textAlignment!,
          });
        }}
        active={textStyle.textAlignment === "right"}
      >
        <IconAlignRight size={20} />
      </CoreButton>
    </div>
  );
};
