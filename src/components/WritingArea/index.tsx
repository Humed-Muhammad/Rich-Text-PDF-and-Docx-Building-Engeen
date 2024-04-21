import { WritingAreaOptions } from "../types";

import "../../index.css";
import "../../styles/index.css";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { ContextMenu as ShadcnContext } from "../core/ContextMenu";
import { Sheet } from "../Sheet";
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

  return (
    <ContextMenu>
      <ContextMenuTrigger id="writingArea-playground-container">
        {allPaperRefs?.map((paperRef) => (
          <Sheet
            id={paperRef.id}
            changeTextStyle={changeTextStyle}
            hideCustomMenu={hideCustomMenu}
            size={size}
            updateStyle={updateStyle}
            key={paperRef.id}
            // paperRef={paperRef.ref}
            content={paperRef.content}
          />
        ))}
      </ContextMenuTrigger>
      <ShadcnContext
        updateStyle={updateStyle}
        contentRef={contentRef}
        {...changeTextStyle}
      />
    </ContextMenu>
  );
};
