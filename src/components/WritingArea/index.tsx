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
import { v4 } from "uuid";

export const WritingArea = ({
  size = { width: "794px", height: "1123px" },
  contentRef,
  changeTextStyle,
  hideCustomMenu,
  updateStyle,
}: WritingAreaOptions) => {
  const allPaperRefs = useAppSelector(selectAllPaperRefs);
  useEffect(() => {
    if (allPaperRefs.length > 0)
      allPaperRefs.map((paperRef) => {
        if (paperRef?.ref && paperRef) {
          paperRef.ref.innerHTML = deltaToHtml(paperRef.content) as string;
        }
      });
  }, [allPaperRefs]);

  console.log({ allPaperRefs });
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {!allPaperRefs.length ? (
          <Sheet
            id={v4()}
            changeTextStyle={changeTextStyle}
            hideCustomMenu={hideCustomMenu}
            size={size}
            updateStyle={updateStyle}
          />
        ) : (
          allPaperRefs.map((paperRef, key) => (
            <Sheet
              id={paperRef.id}
              changeTextStyle={changeTextStyle}
              hideCustomMenu={hideCustomMenu}
              size={size}
              updateStyle={updateStyle}
              key={key}
              paperRef={paperRef.ref}
            />
          ))
        )}
      </ContextMenuTrigger>
      <ShadcnContext
        updateStyle={updateStyle}
        contentRef={contentRef}
        {...changeTextStyle}
      />
    </ContextMenu>
  );
};
