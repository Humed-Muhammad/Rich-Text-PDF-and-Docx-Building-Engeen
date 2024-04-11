import { useCallback, useEffect, useState } from "react";
import { usePdfXContext } from "./usePdfXContext";
import { generateTableRow } from "../tableUtils";
import { ActiveColumn, WritingAreaOptions } from "@/components/types";
import { useColumnOptions } from "./useColumnOptions";
import { uniqueId } from "lodash";

export const useTableMenu = ({ contentRef }: Partial<WritingAreaOptions>) => {
  const [activeTr, setActiveTr] = useState<Element | undefined>();
  const [activeColTd, setActiveColTd] = useState<ActiveColumn>();
  const [activeColTr, setActiveColTr] = useState<Element | undefined>();

  const {
    tableCreated,
    setTableCreated,
    rowSettingPosition,
    setRowSettingPosition,
    columnSettingPosition,
    setColumnSettingPosition,
    domUpdated,
    setDomUpdated,
  } = usePdfXContext();

  const handleRowColOperation = useCallback(() => {
    const allTables = document.querySelectorAll("table");
    const tableRows = document.querySelectorAll("tr");
    const tableTds = document.querySelectorAll("td");

    const updatePosition = (element: Element, fromRow: boolean) => {
      const rect = element.getBoundingClientRect();

      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      if (fromRow) {
        setRowSettingPosition({
          x: rect?.left + scrollX,
          y: rect?.top + scrollY,
        });
      } else {
        setColumnSettingPosition({
          x: rect?.left + scrollX,
          y: rect?.top + scrollY,
        });
      }
    };

    tableRows?.forEach((tr) => {
      tr.addEventListener("mouseenter", () => {
        setActiveTr(tr);
        updatePosition(tr, true);
      });
    });

    allTables?.forEach((table) => {
      /**@description This specific selection is needed to only consider the first row of each tables */
      const element = table?.childNodes?.[0]?.childNodes?.[0] as Element;
      const tds = element.querySelectorAll("td");
      setActiveColTr(element);
      tds.forEach((td, index) => {
        td.addEventListener("mouseenter", () => {
          setActiveColTd({ td, index });
          updatePosition(td, false);
        });
      });
    });

    tableTds?.forEach((td) => {
      td.addEventListener("click", () => {
        setRowSettingPosition({ x: 0, y: 0 });
        setColumnSettingPosition({ x: 0, y: 0 });
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableCreated, contentRef, domUpdated]);

  const insertRowBelow = useCallback(() => {
    const tr = generateTableRow({
      columns: activeTr?.childNodes.length ?? 0,
    });
    activeTr?.parentElement?.appendChild(tr);
    setTableCreated((prev) => !prev);
    setDomUpdated(uniqueId());
  }, [activeTr, setTableCreated]);

  const insertRowAbove = useCallback(() => {
    const tr = generateTableRow({
      columns: activeTr?.childNodes.length ?? 0,
    });

    activeTr?.parentElement?.insertBefore(tr, activeTr);
    setTableCreated((prev) => !prev);
    setDomUpdated(uniqueId());
  }, [activeTr, setTableCreated]);

  const deleteRow = useCallback(() => {
    activeTr?.parentElement?.removeChild(activeTr);
    setTableCreated((prev) => !prev);
    setDomUpdated(uniqueId());
  }, [activeTr, setTableCreated]);

  useEffect(() => {
    handleRowColOperation();
  }, [handleRowColOperation]);

  useEffect(() => {
    contentRef?.addEventListener("click", () => {
      setRowSettingPosition({ x: 0, y: 0 });
      setColumnSettingPosition({ x: 0, y: 0 });
    });
    return () => {
      setRowSettingPosition({ x: 0, y: 0 });
      setColumnSettingPosition({ x: 0, y: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { insertColumnLeft, insertColumnRight } = useColumnOptions({
    activeColTr,
    activeColTd,
  });

  return {
    rowSettingPosition,
    activeTr,
    insertRowBelow,
    insertRowAbove,
    deleteRow,
    columnSettingPosition,
    setColumnSettingPosition,
    activeColTr,
    insertColumnLeft,
    insertColumnRight,
  };
};
