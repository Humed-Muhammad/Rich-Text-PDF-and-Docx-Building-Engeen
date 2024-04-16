import { FocusedData, WritingAreaOptions } from "./types";

import { eventKeys } from "./utils/constants";
import { useGetFocusedElement } from "./utils/hooks/useGetFocusedElement";
import { useSpan } from "./utils/hooks/useSpan";
import { useGetTextProperties } from "./utils/hooks/useGetTextProperties";
import { useNodeTraverse } from "./utils/hooks/useNodeTraverse";
import { useAppDispatch } from "./store/hooks";
import {
  setCurrentRef,
  setFocusedData,
  updatePaperRefContent,
} from "./store/pdfGenSlice";
import { handleKeyCombination } from "./utils";
import "../index.css";
import "../styles/index.css";
import { htmlToDelta } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

export const Sheet = ({
  size = { width: "794px", height: "1123px" },
  hideCustomMenu,
  id,
  content,
}: WritingAreaOptions) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { getFocusedElement } = useGetFocusedElement();
  const { setTextProperties } = useGetTextProperties();
  const { traverseTreeByNodeName, traverseTreeByCSSProperties } =
    useNodeTraverse();
  const { createElement } = useSpan();

  const handleEditorClick = useCallback(() => {
    contentRef?.current?.focus();
    hideCustomMenu();
    dispatch(setCurrentRef(contentRef));
  }, [contentRef, hideCustomMenu]);

  const createSpanElementAndListenToFocus = async (
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

  useEffect(() => {
    if (contentRef.current) {
      dispatch(
        updatePaperRefContent({
          id: id as string,
          content: htmlToDelta(contentRef.current.innerHTML),
        })
      );
    }
  }, [contentRef.current?.innerHTML, id, dispatch]);

  useEffect(() => {
    if (contentRef.current && content) contentRef.current.innerHTML = content;
  }, []);

  return (
    <div
      ref={contentRef}
      onClick={handleEditorClick}
      contentEditable
      id={id}
      className="pdfx-content-editable my-context-menu-target relative"
      style={{
        width: size?.width,
        height: size?.height,
      }}
      onInput={async (event) => {
        console.log(htmlToDelta(event.currentTarget.innerHTML));
        hideCustomMenu();
        await getFocusedElement().then((data) => {
          dispatch(setFocusedData(data));
          createSpanElementAndListenToFocus(data, false);
        });
      }}
      onMouseUp={async () => {
        await getFocusedElement().then((data) => {
          dispatch(setFocusedData(data));
          createSpanElementAndListenToFocus(data, true);
        });
      }}
      onMouseDown={async () => {
        await getFocusedElement().then((data) => {
          dispatch(setFocusedData(data));
          createSpanElementAndListenToFocus(data, true);
        });
      }}
      onKeyDown={async (event) => {
        if (eventKeys.includes(event.key)) {
          hideCustomMenu();
          await getFocusedElement().then((data) => {
            dispatch(setFocusedData(data));
            createSpanElementAndListenToFocus(data, true);
          });
        }
        handleKeyCombination(event, {
          key: "a",
          combinationKey: "ctrlKey",
          async callback() {
            await getFocusedElement().then((data) => {
              dispatch(setFocusedData(data));
            });
            hideCustomMenu();
          },
          keepDefaultBehavior: true,
        });
      }}
    ></div>
  );
};
