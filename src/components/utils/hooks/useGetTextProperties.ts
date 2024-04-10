import { useCallback } from "react";
import {
  extractNumberFromString,
  getColorPropertiesOfSelectedElement,
} from "..";
import {
  HeadingTextStyle,
  TextStyleType,
  fontFamily,
  headingNodeName,
} from "../constants";
import { setTextStyle } from "@/components/store/pdfGenSlice";
import { useAppDispatch } from "@/components/store/hooks";
import { UseGetTextProperties } from "@/components/types";
import { useNodeHeadingFinder } from "./useNodeHeadingFinder";

export const useGetTextProperties = () => {
  const dispatch = useAppDispatch();
  const { getNodeHeading } = useNodeHeadingFinder();

  const setTextProperties = useCallback(
    ({
      focusedData,
      traverseTreeByNodeName,
      traverseTreeByCSSProperties,
    }: UseGetTextProperties) => {
      const nodeHeadingValue = getNodeHeading({
        focusedData,
        traverseTreeByNodeName,
        nodeTypes: headingNodeName,
        defaultNodeType: "P",
      });

      let headingValue: TextStyleType | undefined;

      const singleTextSTyle = HeadingTextStyle.find(
        (style) => style.value === nodeHeadingValue
      );

      if (singleTextSTyle) {
        headingValue = singleTextSTyle;
      } else {
        headingValue = HeadingTextStyle?.[0];
      }

      const { selectedElementColor, selectedElementRootColor } =
        getColorPropertiesOfSelectedElement();

      const underLine =
        traverseTreeByNodeName(focusedData, "U").some((node) => node === "U") ||
        traverseTreeByCSSProperties(focusedData, "fontStyle") === "underline";
      const bold =
        traverseTreeByNodeName(focusedData, "B").some((node) => node === "B") ||
        traverseTreeByCSSProperties(focusedData, "fontWeight") === "bolder";

      const italic =
        traverseTreeByNodeName(focusedData, "I").some((node) => node === "I") ||
        traverseTreeByCSSProperties(focusedData, "fontStyle") === "italic";

      const fontSize = traverseTreeByCSSProperties?.(focusedData, "fontSize");

      dispatch(
        setTextStyle({
          bold,
          italic,
          heading: headingValue as TextStyleType,
          color: selectedElementColor || selectedElementRootColor,
          underLine,
          textAlignment: traverseTreeByCSSProperties?.(
            focusedData,
            "textAlign"
          ),
          fontSize: extractNumberFromString(
            [undefined, "inherit"].includes(fontSize)
              ? "16px"
              : (fontSize as string)
          ),
          fontFamily: {
            value:
              traverseTreeByCSSProperties?.(focusedData, "fontFamily") ||
              fontFamily[0].value,
            label:
              traverseTreeByCSSProperties?.(focusedData, "fontFamily") ||
              fontFamily[0].label,
          },
        })
      );
    },
    [dispatch, getNodeHeading]
  );

  return {
    setTextProperties,
  };
};
