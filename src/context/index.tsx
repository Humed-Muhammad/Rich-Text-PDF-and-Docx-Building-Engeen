import { ReactNode, useState } from "react";
import { Context } from "./contextValue";
import {
  HeadingTextStyle,
  TextStyleType,
  fontFamily,
} from "@/components/utils/constants";
import { Delta, FocusedData, Position } from "@/components/types";
import {
  CurrentRef,
  PaperRef,
  SelectedElementChild,
  SelectedElementType,
  TextStyle,
} from "./types";

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

  // NEW

  // New PDF generator state
  const [textStyle, setTextStyle] = useState<TextStyle>({
    bold: false,
    italic: false,
    heading: {
      label: "Normal Text",
      value: "P",
    },
    color: null,
    underLine: false,
    textAlignment: "",
    fontSize: 16,
    fontFamily: fontFamily[0],
  });
  const [selectedElementRootState, setSelectedElementRootState] =
    useState<SelectedElementType>();
  const [selectedElementState, setSelectedElementState] =
    useState<SelectedElementChild>();
  const [documentName, setDocumentName] = useState("Untitled document");
  const [paperRefs, setPaperRefs] = useState<PaperRef[]>([
    /* Initial paper refs */
  ]);
  const [focusedPaperId, setFocusedPaperId] = useState("");
  const [currentRef, setCurrentRef] = useState<CurrentRef | null>(null);

  const updateTextStyle = (newStyle: Partial<TextStyle>) => {
    setTextStyle((prev) => ({ ...prev, ...newStyle }));
  };

  const updatePaperRef = (newPaperRef: PaperRef) => {
    setPaperRefs((prev) => {
      const existingIndex = prev.findIndex((ref) => ref.id === newPaperRef.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = newPaperRef;
        return updated;
      }
      return [...prev, newPaperRef];
    });
  };

  const updatePaperRefContent = ({
    id,
    content,
  }: {
    id: string;
    content: Delta;
  }) => {
    setPaperRefs((prev) => {
      const existingIndex = prev.findIndex((ref) => ref.id === id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], content };
        return updated;
      }
      return prev;
    });
  };

  const removePaper = (index: number) => {
    setPaperRefs((prev) => prev.filter((_, i) => i !== index));
  };
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
        textStyle,
        updateTextStyle,
        selectedElementRootState,
        setSelectedElementRootState,
        selectedElementState,
        setSelectedElementState,
        documentName,
        setDocumentName,
        paperRefs,
        updatePaperRef,
        updatePaperRefContent,
        removePaper,
        focusedPaperId,
        setFocusedPaperId,
        currentRef,
        setCurrentRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};
