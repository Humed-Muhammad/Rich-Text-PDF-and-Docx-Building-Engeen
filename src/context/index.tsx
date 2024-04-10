import { ReactNode, useState } from "react";
import { Context } from "./contextValue";
import {
  HeadingTextStyle,
  TextStyleType,
  fontFamily,
} from "@/components/utils/constants";
import { FocusedData, Position } from "@/components/types";

interface Props {
  children: ReactNode;
}
export const ContextProvider = ({ children }: Props) => {
  /**@State */
  const [headingOptions, setHeadingOptions] =
    useState<Array<TextStyleType>>(HeadingTextStyle);
  const [fontFamilies, setFontFamilies] = useState<TextStyleType[]>(fontFamily);
  const [tableCreated, setTableCreated] = useState<boolean>(false);
  const [rowSettingPosition, setRowSettingPosition] = useState<Position>({});
  const [columnSettingPosition, setColumnSettingPosition] = useState<Position>(
    {}
  );
  const [focusedData, setFocusedData] = useState<FocusedData>();
  const [domUpdated, setDomUpdated] = useState("");

  const addFontFamilies = (fontFamilies: Array<TextStyleType>) =>
    setFontFamilies((prev) => [...prev, ...fontFamilies]);

  return (
    <Context.Provider
      value={{
        focusedData,
        setFocusedData,
        setHeadingOptions,
        headingOptions,
        fontFamilies,
        addFontFamilies,
        tableCreated,
        setTableCreated,
        rowSettingPosition,
        setRowSettingPosition,
        columnSettingPosition,
        setColumnSettingPosition,
        domUpdated,
        setDomUpdated,
      }}
    >
      {children}
    </Context.Provider>
  );
};
