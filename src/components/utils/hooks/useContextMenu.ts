import { FocusedData } from "@/components/types";
import { useCallback, useEffect } from "react";

export const useContextMenu = (focusedData: Partial<FocusedData>) => {
  const contextMenu = document.getElementById("pdfx-context-menu");

  // Function to show the custom menu
  const showCustomMenu = useCallback(
    (x: number, y: number) => {
      if (contextMenu) {
        contextMenu.style.display = "flex";
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
      }
    },
    [contextMenu]
  );

  // Function to hide the custom menu
  const hideCustomMenu = useCallback(() => {
    if (contextMenu) contextMenu.style.display = "none";
  }, [contextMenu]);

  // Event listener for right-click on the editable div
  const listToContextMeu = useCallback(() => {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();

      const boundingRect = focusedData.range?.getBoundingClientRect();
      const x = (Number(boundingRect?.left) + 30) as number;
      const y = Number(boundingRect?.top) + window.pageYOffset + 15;

      if (boundingRect) {
        showCustomMenu(x, y);
      } else {
        hideCustomMenu();
      }
    });
    return () => hideCustomMenu();
  }, [focusedData?.range, showCustomMenu, hideCustomMenu]);

  useEffect(() => {
    listToContextMeu();
  }, [listToContextMeu]);

  return { listToContextMeu, showCustomMenu, hideCustomMenu };
};
