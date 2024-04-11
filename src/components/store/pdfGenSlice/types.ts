import {
  HeadingType,
  FocusedData,
  FontFamilyType,
  Delta,
} from "@/components/types";

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
  paperRefs: Array<PaperRef>;
  focusedPaperId: string;
}

export interface ChangeTextStyle {
  value: HeadingType | FontFamilyType | string;
  label: string;
}

export type PaperRef = {
  ref: HTMLDivElement | null;
  id: string;
  content: Delta;
};
