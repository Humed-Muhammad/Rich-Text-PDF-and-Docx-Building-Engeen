import { WritingArea } from "./components/WritingArea";
import { SideBar } from "./components/sideBar";

import { useTextStyleChange } from "./components/utils/hooks/useTextStyleChange";
import { useContextMenu } from "./components/utils/hooks/useContextMenu";
import { ColumnMenu, RowMenu, TableDragger } from "./components/core/TableMenu";
import useSelectionStyle from "./components/utils/hooks/useSelectionStyle";
import { useTD } from "./components/utils/hooks/useTD";
import { usePdfXContext } from "./components/utils/hooks/usePdfXContext";

import { DraggableWrapper } from "./components/core/DraggableWrapper";

function App() {
  const changeTextStyle = useTextStyleChange();
  const updateStyle = useSelectionStyle();
  const { hideCustomMenu } = useContextMenu(changeTextStyle.focusedData);
  useTD();

  const { currentRef } = usePdfXContext();

  return (
    <div className="pdfx-container">
      <SideBar
        updateStyle={updateStyle}
        contentRef={currentRef?.current}
        {...changeTextStyle}
      />
      {/* <Ruler /> */}

      <div id="writing-area" className="pdfx-writing-area-container">
        <WritingArea
          changeTextStyle={changeTextStyle}
          hideCustomMenu={hideCustomMenu}
          contentRef={currentRef?.current}
          updateStyle={updateStyle}
        />
      </div>
      <RowMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={currentRef?.current}
        updateStyle={updateStyle}
      />
      <ColumnMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={currentRef?.current}
        updateStyle={updateStyle}
      />
      <TableDragger
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={currentRef?.current}
        updateStyle={updateStyle}
      />
    </div>
  );
}

export default App;
