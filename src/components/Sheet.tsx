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
} from "./store/pdfGenSlice";
import { getParentWritingAreaId, handleKeyCombination } from "./utils";
import "../index.css";
import "../styles/index.css";
import { htmlToDelta } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";
import { selectFocusedData } from "./store/pdfGenSlice/selectors";
import { v4 } from "uuid";

export const Sheet = ({
  size = { width: "794px", height: "1123px" },
  // contentRef,
  hideCustomMenu,
}: WritingAreaOptions) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { getFocusedElement } = useGetFocusedElement();
  const { setTextProperties } = useGetTextProperties();
  const { traverseTreeByNodeName, traverseTreeByCSSProperties } =
    useNodeTraverse();
  const { createElement } = useSpan();

  const handleEditorClick = () => {
    hideCustomMenu();
    contentRef?.current?.focus();
  };

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

  const uniqueKey = useMemo(() => v4(), []);
  useEffect(() => {
    if (contentRef) {
      dispatch(
        setPaperRefs({
          ref: contentRef,
          id: `writingArea-${uniqueKey}`,
          content: htmlToDelta(contentRef.current?.innerHTML ?? ""),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueKey]);

  const focusedData = useAppSelector(selectFocusedData);

  const focusedPaperId = useMemo(
    () => getParentWritingAreaId(focusedData.focusedNode),
    [focusedData.focusedNode]
  );

  useEffect(() => {
    dispatch(setFocusedPaperId(focusedPaperId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedPaperId]);

  useEffect(() => {
    console.log({ focusedPaperId });
  }, [focusedPaperId]);

  return (
    <div
      ref={contentRef}
      onClick={handleEditorClick}
      contentEditable
      id={`writingArea-${uniqueKey}`}
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
