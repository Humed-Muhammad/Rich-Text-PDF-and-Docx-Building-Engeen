/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";

import { alignTextHandler, styleTheSelectedRange, valueTransformer } from "..";
import { nodeStyleProperties } from "../constants";
import {
  HandleNodeStyleOptions,
  StylePropertyCSSDeclaration,
} from "@/components/types";
import { usePdfXContext } from "./usePdfXContext";

export const useTextStyleChange = () => {
  const [updatedElement, setUpdatedElement] = useState<HTMLSpanElement>();
  const [parentElement, setParentElement] = useState<HTMLElement>();
  const {
    focusedData,
    documentName,
    textStyle,
    setFocusedData,
    updateTextStyle,
  } = usePdfXContext();

  /**
   * The `changeTextStyle` function takes an element type as input and changes the text style of the
   * selected content in the document accordingly.
   * @param {HeadingType | string} elementType - The `elementType` parameter is the type of element that
   * you want to create and insert into the document. It can be either an `HeadingType` or a string. The
   * `HeadingType` is a type defined in TypeScript that represents valid HTML element types, such as
   * "div", "p", "h
   */

  const handleElementAlignment = useCallback(
    (position: "left" | "right" | "center") => {
      updateTextStyle({
        ...textStyle,
        textAlignment: position,
      });

      alignTextHandler(position);
    },

    [textStyle]
  );

  /**@Fixed This implementation is not good, because we need also to track or check if it is already bolded or italic to reverse it to normal and using the parent element is not correct use only the selected textNode, solution is to create a b tag and extract the text an append it to the b tag same for italic */

  const handleNodeStyle = useCallback(
    async (options: HandleNodeStyleOptions) => {
      const { toggle, type, customValue, stateValue } = options;
      const formattedValue = valueTransformer(customValue, type);

      const styleProperty = nodeStyleProperties[type].style;
      const styleValue = formattedValue || nodeStyleProperties[type].value;

      updateTextStyle({
        ...textStyle,
        [type]: stateValue || customValue || !toggle,
      });

      /* This code snippet is checking if the `textContent` of the `parentElement` matches the text
    content of the `focusedData.range`. If they match, it means that the entire content within the
    `parentElement` is selected. In this case, it applies the
    specified style (`styleValue`) to the `parentElement` using the `styleProperty`. */
      if (parentElement?.textContent === focusedData?.range?.toString()) {
        if (parentElement) {
          parentElement.style[styleProperty] =
            styleValue as StylePropertyCSSDeclaration;
        }
      } /*
      This block of code is responsible for applying the specified style to the selected portion
      of text when the entire content within the `parentElement` is not selected. */ else {
        const createdELement = styleTheSelectedRange({
          focusedData: focusedData!,
          style: { [styleProperty]: styleValue as string, fontSize: "inherit" },
        });
        setUpdatedElement(createdELement);
        setFocusedData({ ...focusedData, focusedNode: createdELement });
        console.log("Portion");
      }
    },

    [focusedData, JSON.stringify(textStyle), parentElement]
  );

  useEffect(() => {
    const parentElement =
      updatedElement || focusedData?.focusedNode?.parentElement;
    setParentElement(parentElement as HTMLElement);
  }, [focusedData, updatedElement]);

  return {
    // changeTextStyle,
    textStyle,
    handleElementAlignment,
    handleNodeStyle,
    documentName,
    focusedData,
  };
};
