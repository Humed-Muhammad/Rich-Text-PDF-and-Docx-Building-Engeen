import { useCallback, useEffect } from "react";

export const useTD = () => {
  const updateStyleOnDoubleClick = useCallback(() => {
    const tds = document.querySelectorAll("td");
    // tds.forEach((td) => {
    //   td.addEventListener("dblclick", () => {
    //     td.style.backgroundColor = "#457";
    //   });
    // });
  }, []);

  useEffect(() => {
    updateStyleOnDoubleClick();
  }, [updateStyleOnDoubleClick]);
  return {};
};
