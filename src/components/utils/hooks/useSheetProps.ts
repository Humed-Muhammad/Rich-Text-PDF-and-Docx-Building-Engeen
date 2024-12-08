import { HeadingType, SheetProps } from "@/components/types";
import { KeyboardEvent, useCallback, useEffect, useRef } from "react";
import { useGetFocusedElement } from "./useGetFocusedElement";

import { deltaToHtml, htmlToDelta } from "@/lib/utils";
import { eventKeys, headingNodeName } from "../constants";
import { handleKeyCombination } from "..";
import { usePdfXContext } from "./usePdfXContext";

export const useSheetProps = ({
  size = { width: "794px", height: "1123px" },
  customCommand,
  id,
  content,
}: SheetProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { getFocusedElement } = useGetFocusedElement(contentRef);
  const { setCurrentRef, updatePaperRefContent, setFocusedData } =
    usePdfXContext();
  const handleEditorClick = useCallback(() => {
    contentRef?.current?.focus();
    customCommand();
    setCurrentRef(contentRef);
  }, [contentRef, customCommand]);

  useEffect(() => {
    if (contentRef.current) {
      const content = htmlToDelta(contentRef.current.innerHTML);
      // console.log(content);

      updatePaperRefContent({
        id: id as string,
        content,
      });
    }
  }, [contentRef.current?.innerHTML, id]);

  useEffect(() => {
    if (contentRef.current && content) {
      contentRef.current.innerHTML = deltaToHtml(content);
    }
  }, []);

  const listenAndGetFocusedElement = useCallback(
    async (keyDown?: boolean) => {
      await getFocusedElement(keyDown).then((data) => {
        setFocusedData(data);
      });
    },
    [getFocusedElement]
  );

  const onKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        await getFocusedElement(true).then((data) => {
          if (data.focusedNode && data.range) {
            let nodeToBeInserted: Node;
            if (data.focusedNode.nodeName === "#text") {
              nodeToBeInserted = data.focusedNode.parentElement as Node;
            } else {
              nodeToBeInserted = data.focusedNode;
            }
            if (
              headingNodeName.includes(nodeToBeInserted.nodeName as HeadingType)
            ) {
              const div = document.createElement("div");
              div.appendChild(nodeToBeInserted);
              data.range.insertNode(div);
              data.range.setStartBefore(div);
              data.range.collapse(true);
              data.selection?.removeAllRanges();
              data.selection?.addRange(data.range);
            }
          }
        });
      }

      if (eventKeys.includes(event.key)) {
        customCommand();
        await getFocusedElement(true).then((data) => {
          setFocusedData(data);
        });
      }
      handleKeyCombination(event, {
        key: "a",
        combinationKey: "ctrlKey",
        async callback() {
          await getFocusedElement().then((data) => {
            setFocusedData(data);
          });
          customCommand();
        },
        keepDefaultBehavior: true,
      });
    },
    [getFocusedElement, customCommand]
  );

  return {
    ref: contentRef,
    contentEditable: true,
    id: id,

    style: {
      width: size?.width,
      height: size?.height,
    },
    onClick: handleEditorClick,
    onInput: () => {
      customCommand();
      listenAndGetFocusedElement(false);
    },
    onMouseUp: () => listenAndGetFocusedElement(true),
    onMouseDown: () => listenAndGetFocusedElement(true),
    onKeyDown,
    className: "pdfx-content-editable my-context-menu-target relative",
  };
};
