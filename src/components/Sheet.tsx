import { WritingAreaOptions } from "./types";

import { eventKeys } from "./utils/constants";
import { useGetFocusedElement } from "./utils/hooks/useGetFocusedElement";
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

  const handleEditorClick = useCallback(() => {
    contentRef?.current?.focus();
    hideCustomMenu();
    dispatch(setCurrentRef(contentRef));
  }, [contentRef, hideCustomMenu]);

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
        await getFocusedElement(false).then((data) => {
          dispatch(setFocusedData(data));
        });
      }}
      onMouseUp={async () => {
        await getFocusedElement(true).then((data) => {
          dispatch(setFocusedData(data));
        });
      }}
      onMouseDown={async () => {
        await getFocusedElement(true).then((data) => {
          dispatch(setFocusedData(data));
        });
      }}
      onKeyDown={async (event) => {
        if (eventKeys.includes(event.key)) {
          hideCustomMenu();
          await getFocusedElement(true).then((data) => {
            dispatch(setFocusedData(data));
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
