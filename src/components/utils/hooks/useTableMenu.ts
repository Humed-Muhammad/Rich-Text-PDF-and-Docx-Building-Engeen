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
    setActiveTable,
    activeTable,
    setTableDraggerPosition,
    tableDraggerPosition,
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

    // Drag Selection
    const selectedTds: Array<HTMLTableCellElement> = [];
    let isMouseDown = false;
    let startCell: HTMLTableCellElement | null = null;
    tableTds?.forEach((td) => {
      // Handle drag selection start
      td.addEventListener("dblclick", (e) => {
        isMouseDown = true;
        startCell = td as HTMLTableCellElement;
        td.style.backgroundColor = "#ccddfe";
        e.preventDefault(); // Prevent text selection
      });

      // Handle drag selection
      td.addEventListener("mouseover", () => {
        if (isMouseDown) {
          td.style.backgroundColor = "#ccddfe";
          selectedTds.push(td);
        }
      });

      // Handle ctrl+click for multiple selection
      td.addEventListener("click", (e) => {
        if (e.ctrlKey || e.metaKey) {
          // console.log(e.ctrlKey, e.metaKey);
          const highlighted = !["initial", "", null, undefined].includes(
            td.style.getPropertyPriority("background-color") as string
          );
          // console.log(
          //   { highlighted },
          //   td.style.getPropertyPriority("background-color")
          // );
          td.style.backgroundColor = highlighted ? "initial" : "#ccddfe";
        } else if (!isMouseDown) {
          // Clear other selections if not dragging or ctrl-clicking
          tableTds.forEach((cell) => (cell.style.backgroundColor = "initial"));
          td.style.backgroundColor = "initial";
        }
      });
    });

    // Handle drag selection end
    document.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
    // End

    allTables?.forEach((table) => {
      table.setAttribute("draggable", "true");
      table.addEventListener("mouseenter", () => {
        setActiveTable(table);
      });
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
      contentRef?.removeEventListener("click", () => {
        setRowSettingPosition({ x: 0, y: 0 });
        setColumnSettingPosition({ x: 0, y: 0 });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef]);

  const { insertColumnLeft, insertColumnRight } = useColumnOptions({
    activeColTr,
    activeColTd,
  });

  const updateTableDraggerPosition = useCallback(() => {
    const rect = activeTable?.getBoundingClientRect();

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    if (rect) {
      setTableDraggerPosition({
        x: rect?.left + scrollX,
        y: rect?.top + scrollY,
      });
    }
  }, [activeTable]);

  useEffect(() => {
    updateTableDraggerPosition();
  }, [updateTableDraggerPosition]);

  useEffect(() => {
    console.log(tableDraggerPosition);
  }, [tableDraggerPosition]);

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
    activeTable,
    tableDraggerPosition,
  };
};
