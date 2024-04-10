import { ColumnOptionHook } from "@/components/types";
import { generateTableColumn } from "../tableUtils";
import { useCallback } from "react";
import { usePdfXContext } from "./usePdfXContext";
import { uniqueId } from "lodash";

export const useColumnOptions = ({
  activeColTr,
  activeColTd,
}: ColumnOptionHook) => {
  const { setDomUpdated } = usePdfXContext();
  const insertColumnLeft = useCallback(() => {
    generateTableColumn({
      activeColTd,
      activeColTr,
    });
    setDomUpdated(uniqueId());
  }, [activeColTr, activeColTd]);

  const insertColumnRight = useCallback(() => {
    generateTableColumn({
      activeColTd,
      activeColTr,
      insertToRights: true,
    });
    setDomUpdated(uniqueId());
  }, [activeColTr, activeColTd]);

  return { insertColumnLeft, insertColumnRight };
};
