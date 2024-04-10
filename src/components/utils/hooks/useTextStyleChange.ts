/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectDocumentName,
  selectFocusedData,
  selectTextStyle,
} from "../../store/pdfGenSlice/selectors";
import { setFocusedData, setTextStyle } from "../../store/pdfGenSlice";
import { alignTextHandler, styleTheSelectedRange, valueTransformer } from "..";
import { ChangeTextStyle } from "../../store/pdfGenSlice/types";
import { headingStyles, nodeStyleProperties } from "../constants";
import {
  HandleNodeStyleOptions,
  StylePropertyCSSDeclaration,
} from "@/components/types";

export const useTextStyleChange = () => {
  const [updatedElement, setUpdatedElement] = useState<HTMLSpanElement>();
  const [parentElement, setParentElement] = useState<HTMLElement>();
  const dispatch = useAppDispatch();

  const focusedData = useAppSelector(selectFocusedData);
  const textStyle = useAppSelector(selectTextStyle);
  const documentName = useAppSelector(selectDocumentName);

  /**
   * The `changeTextStyle` function takes an element type as input and changes the text style of the
   * selected content in the document accordingly.
   * @param {HeadingType | string} elementType - The `elementType` parameter is the type of element that
   * you want to create and insert into the document. It can be either an `HeadingType` or a string. The
   * `HeadingType` is a type defined in TypeScript that represents valid HTML element types, such as
   * "div", "p", "h
   */

  const changeTextStyle = useCallback(
    async (textStyle: ChangeTextStyle) => {
      const { range, selection } = focusedData;
      const newElement = document.createElement(textStyle.value);

      //   ?.textContent as string;
      newElement.textContent = range?.toString() as string;

      const headingStyle = headingStyles[textStyle.value];
      if (headingStyle) {
        Object.entries(headingStyle).forEach(([property, value]) => {
          //@ts-ignore
          newElement.style[property] = value;
        });
      }
      range?.extractContents();
      range?.insertNode(newElement);
      range?.setStartAfter(newElement);
      range?.collapse(true);

      selection?.removeAllRanges();
      selection?.addRange(range as Range);
    },
    [focusedData]
  );

  const handleElementAlignment = useCallback(
    (position: "left" | "right" | "center") => {
      dispatch(
        setTextStyle({
          ...textStyle,
          textAlignment: position,
        })
      );
      alignTextHandler(position);
    },

    [dispatch, textStyle]
  );

  /**@Fixed This implementation is not good, because we need also to track or check if it is already bolded or italic to reverse it to normal and using the parent element is not correct use only the selected textNode, solution is to create a b tag and extract the text an append it to the b tag same for italic */

  const handleNodeStyle = useCallback(
    async (options: HandleNodeStyleOptions) => {
      const { toggle, type, customValue, stateValue } = options;
      const formattedValue = valueTransformer(customValue, type);

      const styleProperty = nodeStyleProperties[type].style;
      const styleValue = formattedValue || nodeStyleProperties[type].value;

      dispatch(
        setTextStyle({
          ...textStyle,
          [type]: stateValue || customValue || !toggle,
        })
      );

      /* This code snippet is checking if the `textContent` of the `parentElement` matches the text
    content of the `focusedData.range`. If they match, it means that the entire content within the
    `parentElement` is selected. In this case, it applies the
    specified style (`styleValue`) to the `parentElement` using the `styleProperty`. */
      if (parentElement?.textContent === focusedData.range?.toString()) {
        if (parentElement) {
          parentElement.style[styleProperty] =
            styleValue as StylePropertyCSSDeclaration;
        }
      } /*
      This block of code is responsible for applying the specified style to the selected portion
      of text when the entire content within the `parentElement` is not selected. */ else {
        const createdELement = styleTheSelectedRange({
          focusedData,
          style: { [styleProperty]: styleValue as string, fontSize: "inherit" },
        });
        setUpdatedElement(createdELement);
        dispatch(
          setFocusedData({ ...focusedData, focusedNode: createdELement })
        );
        console.log("Portion");
      }
    },

    [focusedData, JSON.stringify(textStyle), dispatch, parentElement]
  );

  useEffect(() => {
    const parentElement =
      updatedElement || focusedData.focusedNode?.parentElement;
    setParentElement(parentElement as HTMLElement);
  }, [focusedData, updatedElement]);

  return {
    changeTextStyle,
    textStyle,
    handleElementAlignment,
    handleNodeStyle,
    documentName,
    focusedData,
  };
};
