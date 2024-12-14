import { SheetProps } from "./types";
import { useSheetProps } from "./utils/hooks/useSheetProps";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

  return (
    <div
      datatype="sheet"
      {...props}
      style={{
        ...props.style,
        cursor: "default",
        userSelect: "none",
        position: "relative",
      }}
    ></div>
  );
};
