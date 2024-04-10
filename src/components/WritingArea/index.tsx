import { WritingAreaOptions } from "../types";

import { useEffect } from "react";
import "../../index.css";
import "../../styles/index.css";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { ContextMenu as ShadcnContext } from "../core/ContextMenu";
import { Sheet } from "../Sheet";
import { deltaToHtml } from "@/lib/utils";
import { useAppSelector } from "../store/hooks";
import { selectAllPaperRefs } from "../store/pdfGenSlice/selectors";

export const WritingArea = ({
  size = { width: "794px", height: "1123px" },
  contentRef,
  changeTextStyle,
  hideCustomMenu,
  updateStyle,
}: WritingAreaOptions) => {
  const allPaperRefs = useAppSelector(selectAllPaperRefs);
  useEffect(() => {
    allPaperRefs.map((paperRef) => {
      if (paperRef?.ref?.current && paperRef) {
        paperRef.ref.current.innerHTML = deltaToHtml(
          paperRef.content
        ) as string;
      }
    });
  }, [allPaperRefs]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Sheet
          changeTextStyle={changeTextStyle}
          contentRef={contentRef}
          hideCustomMenu={hideCustomMenu}
          size={size}
          updateStyle={updateStyle}
        />
      </ContextMenuTrigger>
      <ShadcnContext
        updateStyle={updateStyle}
        contentRef={contentRef}
        {...changeTextStyle}
      />
    </ContextMenu>
  );
};
