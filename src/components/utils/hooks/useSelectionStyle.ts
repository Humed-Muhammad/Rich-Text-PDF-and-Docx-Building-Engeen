/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useCallback } from "react";
import { convertToCSSProperty } from "../helpers";
import { useGetFocusedElement } from "./useGetFocusedElement";
import { styleTheSelectedRange } from "..";
import { useDispatch } from "react-redux";
import { setFocusedData } from "@/components/store/pdfGenSlice";
import { useAppSelector } from "@/components/store/hooks";
import { selectFocusedData } from "@/components/store/pdfGenSlice/selectors";

export type StyleUpdater = (
  style: Partial<CSSStyleDeclaration>,
  toggle?: boolean
) => void;

const useSelectionStyle = (): StyleUpdater => {
  const { getFocusedElement } = useGetFocusedElement();
  const dispatch = useDispatch();
  const focusedData = useAppSelector(selectFocusedData);

  const updateStyle = useCallback(
    (style: Partial<CSSStyleDeclaration>, toggle?: boolean) => {
      const selection = focusedData?.selection;

      console.log(style);

      if (selection) {
        const parentElement = focusedData?.focusedNode?.parentElement;
        const selectedRange = selection.getRangeAt(0);
        const selectedElements: HTMLElement[] = [];

        const startContainer = selectedRange.startContainer;
        const endContainer = selectedRange.endContainer;

        let currentNode =
          startContainer.nodeName === "#text"
            ? startContainer.parentElement
            : (startContainer as Element);

        const endContainerNode =
          endContainer.nodeName === "#text"
            ? endContainer.parentElement
            : (endContainer as Element);

        if (currentNode !== endContainerNode) {
          while (currentNode && currentNode !== endContainerNode) {
            if (currentNode instanceof HTMLElement) {
              selectedElements.push(currentNode);
            }

            // Traverse through child elements if they exist

            if (currentNode.firstElementChild) {
              currentNode = currentNode.firstElementChild;
            } else if (currentNode.nextElementSibling) {
              currentNode = currentNode.nextElementSibling;
            } else {
              // If there are no child elements or siblings, go back to the parent
              while (currentNode && !currentNode.nextElementSibling) {
                if (
                  !["TR", "TABLE"].includes(
                    currentNode.parentElement?.nodeName as string
                  ) &&
                  !["TR", "TABLE"].includes(currentNode?.nodeName as string) &&
                  !["TR"].includes(
                    endContainerNode?.parentElement?.nodeName as string
                  )
                ) {
                  currentNode = currentNode.parentElement;
                } else {
                  break;
                }
              }
              if (currentNode) {
                currentNode = currentNode.nextElementSibling;
              }
            }
          }
          selectedElements.push(endContainerNode as HTMLElement);
        } else {
          selectedElements.push(currentNode as HTMLElement);
        }

        if (selectedElements.length > 1) {
          for (const element of selectedElements) {
            if (/writingArea/.test(element.id)) {
              break;
            }
            for (const key of Object.keys(style)) {
              const convertedKey = convertToCSSProperty(key);
              const hasProperty =
                element?.style?.getPropertyValue(convertedKey);
              if (hasProperty && toggle) {
                element?.style?.removeProperty(convertedKey);
              } else {
                element?.style?.setProperty(
                  convertedKey,
                  style[key as keyof CSSStyleDeclaration] as string
                );
              }

              if (element.childNodes.length > 0) {
                (element.childNodes as NodeListOf<HTMLElement>).forEach(
                  (node) => {
                    const convertedKey = convertToCSSProperty(key);
                    const hasProperty =
                      node?.style?.getPropertyValue(convertedKey);
                    if (hasProperty && toggle) {
                      node?.style?.removeProperty(convertedKey);
                    } else {
                      node?.style?.setProperty(
                        convertedKey,
                        style[key as keyof CSSStyleDeclaration] as string
                      );
                    }
                  }
                );
              }
            }
          }
        } else {
          const element = selectedElements[0];
          for (const key of Object.keys(style)) {
            const convertedKey = convertToCSSProperty(key);

            if (parentElement?.textContent === focusedData?.range?.toString()) {
              const hasProperty =
                element?.style?.getPropertyValue(convertedKey);
              if (hasProperty && toggle) {
                element?.style?.removeProperty(convertedKey);
              } else {
                element?.style?.setProperty(
                  convertedKey,
                  style[key as keyof CSSStyleDeclaration] as string
                );
              }
            } else {
              if (
                parentElement?.parentElement?.textContent ===
                focusedData?.range?.toString()
              ) {
                const hasProperty =
                  element?.style?.getPropertyValue(convertedKey);
                if (hasProperty && toggle) {
                  element?.style?.removeProperty(convertedKey);
                } else {
                  element?.style?.setProperty(
                    convertedKey,
                    style[key as keyof CSSStyleDeclaration] as string
                  );
                }
              }
              const createdELement = styleTheSelectedRange({
                focusedData,
                style: {
                  [key]: style[key as keyof CSSStyleDeclaration] as string,
                  fontSize: "inherit",
                },
              });
              // setUpdatedElement(createdELement);
              dispatch(
                setFocusedData({ ...focusedData, focusedNode: createdELement })
              );
            }

            if (element.childNodes.length > 0) {
              (element.childNodes as NodeListOf<HTMLElement>).forEach(
                (node) => {
                  const convertedKey = convertToCSSProperty(key);
                  const hasProperty =
                    node?.style?.getPropertyValue(convertedKey);
                  if (hasProperty && toggle) {
                    node?.style?.removeProperty(convertedKey);
                  } else {
                    //@ts-ignore
                    node?.style?.setProperty(
                      convertedKey,
                      style[key as keyof CSSStyleDeclaration] as string
                    );
                  }
                }
              );
            }
          }
        }
      }
    },
    [focusedData, dispatch]
  );

  useEffect(() => {
    document.addEventListener("selectionchange", () => getFocusedElement());

    return () => {
      document.removeEventListener("selectionchange", () =>
        getFocusedElement()
      );
    };
  }, [getFocusedElement]);

  return updateStyle;
};

export default useSelectionStyle;
