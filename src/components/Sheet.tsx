import { SheetProps } from "./types";

import { useSheetProps } from "./utils/hooks/useSheetProps";

export const Sheet = ({
  size = { width: "794px", height: "1123px" },
  customCommand,
  id,
  content,
}: SheetProps) => {
  const props = useSheetProps({
    content,
    customCommand,
    id,
    size,
  });

  return <div {...props}></div>;
};
