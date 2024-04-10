// import { FocusedData } from "@/components/types";
// import { useCallback, useEffect, useMemo, useState } from "react";

import { FocusedData } from "@/components/types";
import { Context } from "@/context/contextValue";
import { useCallback, useContext } from "react";

// /* The `getFocusedElement` function is a callback function that is used to get the currently focused

export const useGetFocusedElement = () => {
  // const [focusedData, setFocusedData] = useState<FocusedData>({
  //   focusedNode: null,
  //   selection: null,
  //   range: undefined,
  // });

  const { setFocusedData, focusedData } = useContext(Context);

  const getFocusedElement: () => Promise<FocusedData> =
    useCallback(async () => {
      const promise = new Promise<FocusedData>((resolve) => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const selection = document.getSelection();

            if (selection && selection.rangeCount > 0) {
              const focusedNode = selection.focusNode;
              const range = selection.getRangeAt(0);
              setFocusedData({
                focusedNode: focusedNode,
                selection,
                range,
              });
              setFocusedData({
                focusedNode: focusedNode,
                selection,
                range,
              });

              resolve({
                focusedNode,
                selection,
                range,
              });
            } else {
              resolve({
                focusedNode: null,
                selection: null,
                range: undefined,
              });
            }
          });
        });
      });
      return promise;
    }, []);

  return { getFocusedElement, focusedData };
};
