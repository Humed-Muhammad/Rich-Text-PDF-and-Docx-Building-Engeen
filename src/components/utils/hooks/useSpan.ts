import { UseSpanOptions } from "@/components/types";
import { createSpanElement } from "..";
import { useCallback } from "react";
import { headingNodeName } from "../constants";

export const useSpan = () => {
  const createElement = useCallback(
    ({ focusedData, style }: UseSpanOptions) => {
      const { focusedNode } = focusedData;
      const parentNodeName = focusedNode?.parentNode?.nodeName as string;
      const childNodeName = focusedNode?.nodeName as string;

      if (
        ![
          ...headingNodeName,
          "SPAN",
          "TR",
          "TD",
          "TABLE",
          "TBODY",
          "B",
          "I",
        ].includes(parentNodeName) &&
        parentNodeName &&
        childNodeName === "#text"
      ) {
        createSpanElement({ focusedData, style, addId: false });
      }
    },
    []
  );
  return { createElement };
};
