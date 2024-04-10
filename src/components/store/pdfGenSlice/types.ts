import { HeadingType, FocusedData, FontFamilyType } from "@/components/types";
import { RefObject } from "react";

export type TextStyle = {
  bold: boolean;
  italic: boolean;
  underLine: boolean;
  color: string | null;
  heading: ChangeTextStyle;
  fontFamily: ChangeTextStyle;
  textAlignment: string | undefined | null;
  fontSize: number | null;
};

export type SelectedElementChild = Node | null | undefined;
export type SelectedElementType = HTMLElement | null | undefined;

export interface PdfGenState {
  textStyle: TextStyle;
  selectedElementState: SelectedElementChild;
  selectedElementRootState: SelectedElementType;
  documentName: string;
  focusedData: FocusedData;
  paperRefs: RefObject<HTMLDivElement>[];
}

export interface ChangeTextStyle {
  value: HeadingType | FontFamilyType | string;
  label: string;
}
