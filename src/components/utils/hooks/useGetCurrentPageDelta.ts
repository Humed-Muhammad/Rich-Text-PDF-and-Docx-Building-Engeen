import { htmlToDelta } from "@/lib/utils";
import { useMemo } from "react";

interface Options {
  paperRef: HTMLDivElement | null;
}
export const useGetCurrentPageDelta = ({ paperRef }: Options) => {
  const delta = useMemo(() => {
    if (paperRef?.innerHTML) htmlToDelta(paperRef?.innerHTML);
  }, [paperRef?.innerHTML]);

  return { delta };
};
