import { FocusedData, Position } from "@/components/types";
import { TextStyleType } from "@/components/utils/constants";
import { Dispatch, SetStateAction } from "react";

import { HeadingType, FontFamilyType, Delta } from "@/components/types";
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
  paperRefs: Array<PaperRef>;
  focusedPaperId: string;
  currentRef: CurrentRef;
}

export type CurrentRef = RefObject<HTMLDivElement> | null;
export interface ChangeTextStyle {
  value: Partial<CSSStyleDeclaration> | string;
  label: string;
}

export type PaperRef = {
  // ref: HTMLDivElement | null;
  id: string;
  content: Delta;
};

export interface IContext {
  setHeadingOptions: Dispatch<SetStateAction<Array<TextStyleType>>>;
  headingOptions: Array<TextStyleType>;
  fontFamilies: TextStyleType[];
  addFontFamilies: (fontFamilies: Array<TextStyleType>) => void;
  tableCreated: boolean;
  setTableCreated: Dispatch<SetStateAction<boolean>>;
  rowSettingPosition: Position;
  setRowSettingPosition: Dispatch<SetStateAction<Position>>;
  columnSettingPosition: Position;
  setColumnSettingPosition: Dispatch<SetStateAction<Position>>;
  focusedData: Partial<FocusedData>;
  setFocusedData: Dispatch<SetStateAction<Partial<FocusedData>>>;
  domUpdated: string;
  setDomUpdated: Dispatch<SetStateAction<string>>;

  // NEW
  // New PDF generator state
  updateTextStyle: (newStyle: Partial<TextStyle>) => void;
  textStyle: TextStyle;
  setSelectedElementRootState: Dispatch<SetStateAction<SelectedElementType>>;
  selectedElementRootState?: SelectedElementType;
  setSelectedElementState: Dispatch<SetStateAction<SelectedElementChild>>;
  selectedElementState?: SelectedElementChild;
  setDocumentName: Dispatch<SetStateAction<string>>;
  documentName: string;
  paperRefs: PaperRef[];
  focusedPaperId: string;
  updatePaperRef: (newPaperRef: PaperRef) => void;
  setCurrentRef: Dispatch<SetStateAction<CurrentRef>>;
  currentRef: CurrentRef | null;
  updatePaperRefContent: (value: { id: string; content: Delta }) => void;
  removePaper: (index: number) => void;
  setFocusedPaperId: Dispatch<SetStateAction<string>>;

  // Table state
  activeTable: HTMLElement | undefined;
  setActiveTable: Dispatch<SetStateAction<HTMLElement | undefined>>;
  tableDraggerPosition: Position;
  setTableDraggerPosition: Dispatch<SetStateAction<Position>>;
}
