/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from "@reduxjs/toolkit";
import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CurrentRef,
  PaperRef,
  PdfGenState,
  SelectedElementChild,
  SelectedElementType,
  TextStyle,
} from "./types";
import { Delta, FocusedData } from "@/components/types";
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
  paperRefs: [
    {
      content: {
        ops: [
          {
            insert: "H",
            attributes: {
              style: "font-size: 32px; color: black;",
              H1: true,
            },
          },
          {
            insert: "eadi",
            attributes: {
              style: "color: rgb(244, 78, 59);",
              H1: true,
              B: true,
              I: true,
            },
          },
          {
            insert: "ng 1",
            attributes: {
              style: "font-size: 32px; color: black;",
              H1: true,
            },
          },
          {
            insert: "Blue baion",
            attributes: {
              style: "color: rgb(0, 156, 224);",
            },
          },
          {
            insert: "\n",
          },
          {
            insert: "Red baion",
            attributes: {
              style: "color: rgb(244, 78, 59);",
            },
          },
        ],
      },
      id: "writingArea-1",
    },
  ],
  focusedPaperId: "",
  currentRef: null,
};

export const pdfGenSlice = createSlice({
  name: "pdfGenSlice",
  initialState,
  reducers: {
    setTextStyle: (state, action: PayloadAction<TextStyle>) => {
      state.textStyle = { ...state.textStyle, ...action.payload };
    },
    setPaperRefs: (state, action: PayloadAction<PaperRef>) => {
      // Check if the payload value already exists in the paperRefs array
      const existingIndex = state.paperRefs.findIndex(
        (ref) => ref.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // If the payload value exists, replace it with the new value
        state.paperRefs[existingIndex] = action.payload;
      } else {
        // If the payload value doesn't exist, add it to the array
        state.paperRefs.push(action.payload);
      }
    },

    updatePaperRefContent: (
      state,
      action: PayloadAction<{ id: string; content: Delta }>
    ) => {
      const existingIndex = state.paperRefs.findIndex(
        (ref) => ref.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Update the content of the existing paperRef
        state.paperRefs[existingIndex].content = action.payload.content;
      }
    },

    removePaper: (state, action: PayloadAction<number>) => {
      state.paperRefs = state.paperRefs.filter(
        (_paper, index) => index !== action.payload
      );
    },
    setFocusedPaperId: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) state.focusedPaperId = action.payload;
    },
    setCurrentRef: (state, action: PayloadAction<CurrentRef>) => {
      //@ts-ignore
      state.currentRef = action.payload;
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
  updatePaperRefContent,
  setCurrentRef,
} = pdfGenSlice.actions;

export default pdfGenSlice.reducer;
