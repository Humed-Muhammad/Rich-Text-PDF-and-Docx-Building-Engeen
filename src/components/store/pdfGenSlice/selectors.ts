import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "..";

export const rootPdfGenSlice = (state: RootState) => state.pdfGen;

export const selectTextStyle = createSelector(
  [rootPdfGenSlice],
  (state) => state.textStyle
);
export const selectSelectedElementState = createSelector(
  [rootPdfGenSlice],
  (state) => state.selectedElementState
);
export const selectSelectedElementRootState = createSelector(
  [rootPdfGenSlice],
  (state) => state.selectedElementRootState
);

export const selectDocumentName = createSelector(
  [rootPdfGenSlice],
  (state) => state.documentName
);

export const selectFocusedData = createSelector(
  [rootPdfGenSlice],
  (state) => state.focusedData
);
