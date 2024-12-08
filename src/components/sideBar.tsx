import { Input } from "./ui/input";
import { MenuBar } from "./core";
import { SideBarProps } from "./types";

import { ColorPicker } from "./core/colorPicker";
import { Alignment } from "./core/alignment";
import { memo } from "react";
import { FontSize } from "./core/FontSize";
import { Bold } from "./core/Bold";
import { TextStyleSelector } from "./core/TextStyleSelector";
import { HeadingTextStyle, fontFamily } from "./utils/constants";
import { Italic } from "./core/Italic";
import { Underline } from "./core/Underline";
import { PaperSetting } from "./core/PaperSetting/PaperSettings";

const SideBarComponent = memo((props: SideBarProps) => {
  const { textStyle, documentName, contentRef, updateStyle, handleNodeStyle } =
    props;

  // const getLabel = useMemo(
  //   () => (options: TextStyleType[], value: HeadingTextStyleValue) => {
  //     const keyValue = options.find((option) => option.value === value);
  //     return keyValue;
  //   },
  //   []
  // );

  const onHeadingSelect = (value: Partial<CSSStyleDeclaration>) => {
    // const headingValue = getLabel(HeadingTextStyle, value) as TextStyleType;
    // dispatch(setTextStyle({ ...textStyle, heading: headingValue }));
    // console.log(value, label);
    updateStyle({
      ...value,
    });
  };

  const onFontFamilySelect = (value: string | Partial<CSSStyleDeclaration>) => {
    updateStyle({
      fontFamily: value as string,
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
          <Bold updateStyle={updateStyle} textStyle={textStyle} />
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
