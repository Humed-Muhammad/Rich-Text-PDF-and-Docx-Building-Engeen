import { WritingAreaOptions } from "../types";

import { template } from "./template";
import { useEffect } from "react";
// import { decodeHtmlElements } from "../utils/decodeJsonToHtml";
import "../../index.css";
import "../../styles/index.css";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { ContextMenu as ShadcnContext } from "../core/ContextMenu";
import { Sheet } from "../Sheet";
import { deltaToHtml } from "@/lib/utils";

export const WritingArea = ({
  size = { width: "794px", height: "1123px" },
  contentRef,
  changeTextStyle,
  hideCustomMenu,
  updateStyle,
}: WritingAreaOptions) => {
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = deltaToHtml(template) as string;
    }
  }, [contentRef]);

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
