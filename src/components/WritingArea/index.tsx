import { WritingAreaOptions } from "../types";

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
  // useEffect(() => {
  //   if (allPaperRefs.length > 0)
  //     allPaperRefs.map((paperRef) => {
  //       if (paperRef?.ref && paperRef) {
  //         paperRef.ref.innerHTML = deltaToHtml(paperRef.content) as string;
  //       }
  //     });
  //   console.log(allPaperRefs);
  // }, [JSON.stringify(allPaperRefs)]);

  return (
    <ContextMenu>
      <ContextMenuTrigger id="writingArea-playground-container">
        {allPaperRefs?.map((paperRef, key) => (
          <Sheet
            id={paperRef.id}
            changeTextStyle={changeTextStyle}
            hideCustomMenu={hideCustomMenu}
            size={size}
            updateStyle={updateStyle}
            key={key}
            // paperRef={paperRef.ref}
            content={deltaToHtml(paperRef.content)}
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
