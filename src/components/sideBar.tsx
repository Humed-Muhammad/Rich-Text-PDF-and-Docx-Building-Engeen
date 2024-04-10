import { Input } from "./ui/input";
import { MenuBar } from "./core";
import { SideBarProps } from "./types";

import { ColorPicker } from "./core/colorPicker";
import { Alignment } from "./core/alignment";
import { memo, useMemo } from "react";
import { FontSize } from "./core/FontSize";
import { Bold } from "./core/Bold";
import { TextStyleSelector } from "./core/TextStyleSelector";
import { useAppDispatch } from "./store/hooks";
import { HeadingTextStyle, TextStyleType, fontFamily } from "./utils/constants";
import { setTextStyle } from "./store/pdfGenSlice";
import { Italic } from "./core/Italic";
import { Underline } from "./core/Underline";
import { PaperSetting } from "./core/PaperSetting/PaperSettings";

const SideBarComponent = memo((props: SideBarProps) => {
  const {
    changeTextStyle,
    textStyle,
    documentName,
    contentRef,
    updateStyle,
    handleNodeStyle,
  } = props;

  const dispatch = useAppDispatch();

  const getLabel = useMemo(
    () => (options: TextStyleType[], value: string) => {
      const keyValue = options.find((option) => option.value === value);
      return keyValue;
    },
    []
  );

  const onHeadingSelect = (value: string) => {
    const headingValue = getLabel(HeadingTextStyle, value) as TextStyleType;
    dispatch(setTextStyle({ ...textStyle, heading: headingValue }));
    changeTextStyle(headingValue);
  };

  const onFontFamilySelect = (value: string) => {
    const fontFamilyValue = getLabel(fontFamily, value) as TextStyleType;
    updateStyle({
      fontFamily: fontFamilyValue?.value,
    });
  };

  return (
    <div className="pdfx-sidebar">
      <Input
        style={{
          width: 200,
        }}
        type="text"
        name="DocumentName"
        placeholder="Untitled Document"
        defaultValue={documentName}
        className="shadow-none border border-slate-300 rounded text-gray-700 bg-white ring-0 focus:outline-none"
      />
      <div className="pdfx-flex pdfx-items-center mt-3">
        <MenuBar contentRef={contentRef} />

        <TextStyleSelector
          value={textStyle?.heading?.value}
          contentRef={contentRef}
          onSelect={onHeadingSelect}
          options={HeadingTextStyle}
          label="Heading Style"
        />
        <TextStyleSelector
          value={textStyle?.fontFamily?.value}
          contentRef={contentRef}
          onSelect={onFontFamilySelect}
          options={fontFamily}
          label="Font Family"
        />

        <div className="pdfx-flex pdfx-items-center">
          <Bold textStyle={textStyle} />
          <Italic textStyle={textStyle} />
          <Underline textStyle={textStyle} />
          <ColorPicker {...props} contentRef={contentRef} />
          <Alignment {...props} contentRef={contentRef} />
          <FontSize
            textStyle={textStyle}
            updateStyle={updateStyle}
            handleNodeStyle={handleNodeStyle}
          />
          <div className="absolute right-3 top-2">
            <PaperSetting />
          </div>
        </div>
      </div>
    </div>
  );
});

export const SideBar = memo(SideBarComponent);
