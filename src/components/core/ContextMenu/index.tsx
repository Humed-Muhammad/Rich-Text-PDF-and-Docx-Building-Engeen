import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { SideBarProps } from "@/components/types";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
} from "@tabler/icons-react";

export function ContextMenu({
  textStyle,
  handleElementAlignment,
}: SideBarProps) {
  return (
    <>
      <ContextMenuContent className="w-52">
        <ContextMenuItem
          onClick={() => document.execCommand("bold")}
          className={textStyle.bold ? `font-extrabold` : ""}
        >
          Bold
          <ContextMenuShortcut>Ctrl B</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => document.execCommand("italic")}
          className={textStyle.italic ? `font-extrabold` : ""}
        >
          Italic
          <ContextMenuShortcut>Ctrl I</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleElementAlignment("left")}>
          Align Left
          <ContextMenuShortcut>
            <IconAlignLeft size={15} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleElementAlignment("center")}>
          Align Center
          <ContextMenuShortcut>
            <IconAlignCenter size={15} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleElementAlignment("right")}>
          Align Right
          <ContextMenuShortcut>
            <IconAlignRight size={15} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </>
  );
}
