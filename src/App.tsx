// import { Canvas } from "./components/Canvas";
import { useRef } from "react";
import { WritingArea } from "./components/WritingArea";
import { SideBar } from "./components/sideBar";

import { useTextStyleChange } from "./components/utils/hooks/useTextStyleChange";
import { useContextMenu } from "./components/utils/hooks/useContextMenu";
import { ColumnMenu, RowMenu } from "./components/core/TableMenu";
import useSelectionStyle from "./components/utils/hooks/useSelectionStyle";
import { useTD } from "./components/utils/hooks/useTD";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const changeTextStyle = useTextStyleChange();
  const updateStyle = useSelectionStyle();
  const { hideCustomMenu } = useContextMenu(changeTextStyle.focusedData);
  useTD();
  return (
    <div className="pdfx-container">
      <SideBar
        updateStyle={updateStyle}
        contentRef={ref}
        {...changeTextStyle}
      />
      {/* <Ruler /> */}
      <div className="pdfx-writing-area-container">
        <WritingArea
          changeTextStyle={changeTextStyle}
          hideCustomMenu={hideCustomMenu}
          contentRef={ref}
          updateStyle={updateStyle}
        />
      </div>
      <RowMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={ref}
        updateStyle={updateStyle}
      />
      <ColumnMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={ref}
        updateStyle={updateStyle}
      />
    </div>
  );
}

export default App;
