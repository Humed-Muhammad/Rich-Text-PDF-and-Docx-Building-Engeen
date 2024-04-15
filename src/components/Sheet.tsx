import { FocusedData, WritingAreaOptions } from "./types";

import { eventKeys } from "./utils/constants";
import { useGetFocusedElement } from "./utils/hooks/useGetFocusedElement";
import { useSpan } from "./utils/hooks/useSpan";
import { useGetTextProperties } from "./utils/hooks/useGetTextProperties";
import { useNodeTraverse } from "./utils/hooks/useNodeTraverse";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  setFocusedData,
  setFocusedPaperId,
  setPaperRefs,
  updatePaperRefContent,
} from "./store/pdfGenSlice";
import { getParentWritingAreaId, handleKeyCombination } from "./utils";
import "../index.css";
import "../styles/index.css";
import { htmlToDelta } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { selectFocusedData } from "./store/pdfGenSlice/selectors";

export const Sheet = ({
  size = { width: "794px", height: "1123px" },
  paperRef,
  hideCustomMenu,
  id,
}: WritingAreaOptions) => {
  const contentRef = useRef<HTMLDivElement>(paperRef ?? null);
  const dispatch = useAppDispatch();
  const { getFocusedElement } = useGetFocusedElement();
  const { setTextProperties } = useGetTextProperties();
  const { traverseTreeByNodeName, traverseTreeByCSSProperties } =
    useNodeTraverse();
  const { createElement } = useSpan();

  const handleEditorClick = useCallback(() => {
    contentRef?.current?.focus();
    hideCustomMenu();
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

  const focusedData = useAppSelector(selectFocusedData);

  const focusedPaperId = useMemo(
    () => getParentWritingAreaId(focusedData.focusedNode),
    [focusedData.focusedNode]
  );

  useEffect(() => {
    dispatch(setFocusedPaperId(focusedPaperId));
  }, [focusedPaperId, dispatch]);

  useEffect(() => {
    if (contentRef.current && !paperRef) {
      contentRef.current.id = `writingArea-${id}`;
      dispatch(
        setPaperRefs({
          ref: contentRef.current,
          id: `writingArea-${id}`,
          content: htmlToDelta(contentRef.current.innerHTML),
        })
      );
      console.log(id);
    }
  }, [dispatch, paperRef, id, contentRef]);

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
