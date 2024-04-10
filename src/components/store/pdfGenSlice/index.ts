/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from "@reduxjs/toolkit";
import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  PaperRef,
  PdfGenState,
  SelectedElementChild,
  SelectedElementType,
  TextStyle,
} from "./types";
import { FocusedData } from "@/components/types";
import { fontFamily } from "@/components/utils/constants";

const initialState: PdfGenState = {
  textStyle: {
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
  },
  selectedElementRootState: undefined,
  selectedElementState: undefined,
  documentName: "Untitled document",
  focusedData: {
    focusedNode: undefined,
    range: undefined,
    selection: null,
  },
  paperRefs: [],
  focusedPaperId: "",
};

export const pdfGenSlice = createSlice({
  name: "pdfGenSlice",
  initialState,
  reducers: {
    setTextStyle: (state, action: PayloadAction<TextStyle>) => {
      state.textStyle = { ...state.textStyle, ...action.payload };
    },
    setPaperRefs: (state, action: PayloadAction<PaperRef>) => {
      //@ts-ignore
      state.paperRefs.push(action.payload);
    },
    removePaper: (state, action: PayloadAction<number>) => {
      state.paperRefs = state.paperRefs.filter(
        (_paper, index) => index !== action.payload
      );
    },
    setFocusedPaperId: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) state.focusedPaperId = action.payload;
    },
    setSelectedElement: (
      state,
      action: PayloadAction<{
        childElement: SelectedElementChild;
        rootELement: SelectedElementType;
      }>
    ) => {
      state.selectedElementState = action.payload
        .childElement as Draft<SelectedElementChild>;

      state.selectedElementRootState = action.payload
        .rootELement as Draft<SelectedElementType>;
    },
    setFocusedData: (state, action: PayloadAction<FocusedData>) => {
      state.focusedData = action.payload as Draft<FocusedData>;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedElement,
  setTextStyle,
  setFocusedData,
  removePaper,
  setPaperRefs,
  setFocusedPaperId,
} = pdfGenSlice.actions;

export default pdfGenSlice.reducer;
