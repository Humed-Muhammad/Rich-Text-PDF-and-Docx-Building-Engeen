import { FocusedData } from "@/components/types";
import { useCallback } from "react";
import { useGetTextProperties } from "./useGetTextProperties";
import { useNodeTraverse } from "./useNodeTraverse";
import { useSpan } from "./useSpan";
// import { setFocusedData as sliceSetFocusedData } from "@/components/store/pdfGenSlice";
import { usePdfXContext } from "./usePdfXContext";

// /* The `getFocusedElement` function is a callback function that is used to get the currently focused
export const useGetFocusedElement = (
  contentRef?: React.RefObject<HTMLDivElement>
) => {
  const { setTextProperties } = useGetTextProperties();
  const { traverseTreeByNodeName, traverseTreeByCSSProperties } =
    useNodeTraverse();
  const { createElement } = useSpan();
  const { setFocusedData, focusedData } = usePdfXContext();

  const createSpanElementAndListenToFocus = (
    focusedData: FocusedData,
    onKeyDown?: boolean
  ) => {
    if (!onKeyDown) {
      createElement({ focusedData });
    }

    setTextProperties({
      focusedData,
      traverseTreeByNodeName,
      traverseTreeByCSSProperties,
    });
  };

  const getFocusedElement: (keyDown?: boolean) => Promise<FocusedData> =
    useCallback(async (keyDown?: boolean) => {
      const promise = new Promise<FocusedData>((resolve) => {
        requestAnimationFrame(() => {
          setTimeout(async () => {
            const selection = document.getSelection();

            if (
              selection &&
              selection.rangeCount > 0 &&
              contentRef?.current &&
              contentRef?.current.contains(selection.anchorNode)
            ) {
              const focusedNode = selection.focusNode;
              const range = selection.getRangeAt(0);
              const focusedData = {
                focusedNode,
                selection,
                range,
              };
              setFocusedData(focusedData);
              createSpanElementAndListenToFocus(focusedData, keyDown);
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
