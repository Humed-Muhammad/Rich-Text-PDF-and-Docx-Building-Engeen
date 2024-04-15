import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useContext, useState } from "react";
import { generateTable } from "../utils";
import { EditableContentArea } from "../types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { usePdfXContext } from "../utils/hooks/usePdfXContext";
import { Context } from "@/context/contextValue";

export function MenuBar({ contentRef }: EditableContentArea) {
  const [colRow, setColRow] = useState({
    col: 5,
    row: 3,
  });

  const { setTableCreated } = usePdfXContext();
  const { focusedData } = useContext(Context);
  return (
    <Menubar className="bg-transparent border-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="text-gray-600 font-normal hover:bg-gray-300 cursor-pointer">
          File
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-gray-600 font-normal hover:bg-gray-300 cursor-pointer">
          Insert
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Table</MenubarSubTrigger>
            <MenubarSubContent className="p-4 flex flex-col">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Column</Label>
                <Input
                  type="number"
                  id="col"
                  value={colRow.col}
                  onChange={(e) =>
                    setColRow((prev) => ({
                      ...prev,
                      col: Number(e.target.value),
                    }))
                  }
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4 my-2">
                <Label htmlFor="maxWidth">Row</Label>
                <Input
                  id="row"
                  value={colRow.row}
                  onChange={(e) =>
                    setColRow((prev) => ({
                      ...prev,
                      row: Number(e.target.value),
                    }))
                  }
                  className="col-span-2 h-8"
                />
              </div>
              <Button
                onClick={() => {
                  console.log(contentRef);
                  generateTable({
                    columns: colRow.col,
                    rows: colRow.row,
                    contentRef,
                    focusedData,
                  });
                  setTableCreated((prev) => !prev);
                }}
              >
                Create
              </Button>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-gray-600 font-normal hover:bg-gray-300 cursor-pointer">
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
