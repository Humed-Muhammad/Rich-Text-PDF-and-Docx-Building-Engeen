/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAppDispatch } from "@/components/store/hooks";
import { setTextStyle } from "@/components/store/pdfGenSlice";
import { SideBarProps } from "@/components/types";

import { IconTextColor, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { CompactPicker, RGBColor } from "react-color";
import { CoreButton } from "..";
import useSelectionStyle from "@/components/utils/hooks/useSelectionStyle";

export const ColorPicker = ({
  textStyle,
  contentRef,
  handleNodeStyle,
}: SideBarProps) => {
  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState("#000");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const updateStyle = useSelectionStyle();
  //@ts-ignore
  const handleClosePicker: FocusEvent = () => {
    setDisplayColorPicker(false);
  };

  const handleColorChange = (color: RGBColor) => {
    const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    dispatch(setTextStyle({ ...textStyle, color: rgba }));
    setSelectedColor(rgba);
    updateStyle({
      color: rgba,
    });

    // handleNodeStyle({
    //   toggle: false,
    //   type: "color",
    //   customValue: rgba,
    // });

    setDisplayColorPicker(false);
    if (contentRef.current) {
      contentRef.current?.focus();
      contentRef.current.onfocus?.(handleClosePicker);
    }
  };

  return (
    <div>
      <CoreButton
        onClick={() => {
          setDisplayColorPicker((prev) => !prev);
        }}
        style={{
          position: "relative",
        }}
      >
        <IconTextColor size={21} color={textStyle.color || selectedColor} />
        {displayColorPicker && (
          <div
            className="bg-white pdfx-absolute z-10"
            style={{ top: "2.5rem", left: 0 }}
          >
            <IconX size={20} />
            <CompactPicker
              color={textStyle.color || selectedColor}
              onChangeComplete={(color) => {
                handleColorChange(color.rgb);
              }}
            />
          </div>
        )}
      </CoreButton>
    </div>
  );
};
