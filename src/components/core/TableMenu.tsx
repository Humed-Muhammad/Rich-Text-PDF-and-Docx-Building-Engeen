import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { WritingAreaOptions } from "../types";
import { useTableMenu } from "../utils/hooks/useTableMenu";
import { IconArrowsMove, IconMinus } from "@tabler/icons-react";
import { memo, useRef } from "react";
import { Button } from "../ui/button";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RowMenu = memo(({ contentRef }: WritingAreaOptions) => {
  const { rowSettingPosition, insertRowBelow, insertRowAbove, deleteRow } =
    useTableMenu({
      contentRef,
    });

  return (
    <div
      className={`${
        !rowSettingPosition.x && !rowSettingPosition.y ? "hidden" : "block"
      }  bg-white rounded-sm border border-gray-50 cursor-pointer absolute`}
      style={{
        top: Number(rowSettingPosition.y ?? 0) + 15,
        left: Number(rowSettingPosition.x ?? 0) - 17,
      }}
    >
      <Menubar className="h-auto rotate-90">
        <MenubarMenu>
          <MenubarTrigger className="focus:bg-transparent p-0 py-0 m-0 w-5 flex items-center justify-center rounded-sm h-2 cursor-pointer">
            <IconMinus className="cursor-pointer" size={10} />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={insertRowBelow}>Insert row below</MenubarItem>
            <MenubarItem onClick={insertRowAbove}>Insert row above</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={deleteRow}>Delete row</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
});

export const ColumnMenu = memo(({ contentRef }: WritingAreaOptions) => {
  const { columnSettingPosition, insertColumnLeft, insertColumnRight } =
    useTableMenu({
      contentRef,
    });

  return (
    <div
      className={`${
        !columnSettingPosition.x && !columnSettingPosition.y
          ? "hidden"
          : "block"
      }  bg-white w-9 rounded-sm border border-gray-50 cursor-pointer absolute`}
      style={{
        top: Number(columnSettingPosition.y ?? 0) - 10,
        left: Number(columnSettingPosition.x ?? 0) + 40,
      }}
    >
      <Menubar className="h-auto">
        <MenubarMenu>
          <MenubarTrigger className="focus:bg-transparent p-0 py-0 m-0 w-7 flex items-center justify-center rounded-sm h-2 cursor-pointer">
            <IconMinus className="cursor-pointer" size={10} />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={insertColumnLeft}>
              Insert column left
            </MenubarItem>
            <MenubarItem onClick={insertColumnRight}>
              Insert column right
            </MenubarItem>
            <MenubarItem>Delete column</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
});

export const TableDragger = memo(({ contentRef }: WritingAreaOptions) => {
  const { tableDraggerPosition } = useTableMenu({
    contentRef,
  });
  const ref = useRef<SVGSVGElement>(null);

  return (
    <div
      className={`${
        !tableDraggerPosition.x && !tableDraggerPosition.y ? "hidden" : "block"
      } absolute`}
      style={{
        top: Number((tableDraggerPosition.y ?? 0) - 10),
        right: Number((tableDraggerPosition.x ?? 0) - 10),
      }}
    >
      <>
        <IconArrowsMove
          ref={ref}
          onDoubleClick={() => {
            ref.current?.classList.add("cursor-grabbing");
          }}
          onMouseUpCapture={() => {
            ref.current?.classList.remove("cursor-grabbing");
          }}
          className="cursor-grab bg-transparent"
        />
      </>
    </div>
  );
});
