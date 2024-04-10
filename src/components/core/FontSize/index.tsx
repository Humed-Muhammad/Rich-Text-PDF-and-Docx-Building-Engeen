import { TextStyle } from "@/components/store/pdfGenSlice/types";
import { HandleNodeStyle } from "@/components/types";
import { StyleUpdater } from "@/components/utils/hooks/useSelectionStyle";

interface Props {
  updateStyle: StyleUpdater;
  textStyle: TextStyle;
  handleNodeStyle: HandleNodeStyle;
}
export const FontSize = ({
  updateStyle,
  textStyle,
  handleNodeStyle,
}: Props) => {
  return (
    <input
      type="number"
      className="pdfx-font-size"
      value={Number(textStyle.fontSize)}
      onChange={(event) => {
        handleNodeStyle({
          type: "fontSize",
          customValue: Number(event.target.value),
          // stateValue: {
          //   value: event.target.value,
          //   label: ''
          // }
          toggle: false,
        });
      }}
    />
  );
};
