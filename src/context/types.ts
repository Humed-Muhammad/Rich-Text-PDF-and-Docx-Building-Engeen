import { FocusedData, Position } from "@/components/types";
import { TextStyleType } from "@/components/utils/constants";
import { Dispatch, SetStateAction } from "react";

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
  focusedData: FocusedData | undefined;
  setFocusedData: Dispatch<SetStateAction<FocusedData | undefined>>;
  domUpdated: string;
  setDomUpdated: Dispatch<SetStateAction<string>>;
}
