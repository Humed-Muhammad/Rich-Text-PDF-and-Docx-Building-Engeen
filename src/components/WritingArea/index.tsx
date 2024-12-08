import { WritingAreaOptions } from "../types";

import "../../index.css";
import "../../styles/index.css";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { ContextMenu as ShadcnContext } from "../core/ContextMenu";
import { Sheet } from "../Sheet";
import { usePdfXContext } from "../utils/hooks/usePdfXContext";
import { v4 } from "uuid";

export const WritingArea = ({
  size = { width: "794px", height: "1123px" },
  contentRef,
  changeTextStyle,
  hideCustomMenu,
  updateStyle,
}: WritingAreaOptions) => {
  const { paperRefs } = usePdfXContext();

  return (
    <ContextMenu>
      <ContextMenuTrigger id="writingArea-playground-container">
        {paperRefs?.length ? (
          paperRefs?.map((paperRef) => (
            <Sheet
              id={paperRef.id}
              customCommand={hideCustomMenu}
              size={size}
              key={paperRef.id}
              content={paperRef.content}
            />
          ))
        ) : (
          <Sheet id={v4()} customCommand={hideCustomMenu} size={size} />
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
