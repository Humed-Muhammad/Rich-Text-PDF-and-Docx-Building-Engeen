import { WritingArea } from "./components/WritingArea";
import { SideBar } from "./components/sideBar";

import { useTextStyleChange } from "./components/utils/hooks/useTextStyleChange";
import { useContextMenu } from "./components/utils/hooks/useContextMenu";
import { ColumnMenu, RowMenu } from "./components/core/TableMenu";
import useSelectionStyle from "./components/utils/hooks/useSelectionStyle";
import { useTD } from "./components/utils/hooks/useTD";
import { useAppSelector } from "./components/store/hooks";
import { selectCurrentRef } from "./components/store/pdfGenSlice/selectors";

function App() {
  const changeTextStyle = useTextStyleChange();
  const updateStyle = useSelectionStyle();
  const { hideCustomMenu } = useContextMenu(changeTextStyle.focusedData);
  useTD();

  const ref = useAppSelector(selectCurrentRef);

  return (
    <div className="pdfx-container">
      <SideBar
        updateStyle={updateStyle}
        contentRef={ref?.current}
        {...changeTextStyle}
      />
      {/* <Ruler /> */}
      <div className="pdfx-writing-area-container">
        <WritingArea
          changeTextStyle={changeTextStyle}
          hideCustomMenu={hideCustomMenu}
          contentRef={ref?.current}
          updateStyle={updateStyle}
        />
      </div>
      <RowMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={ref?.current}
        updateStyle={updateStyle}
      />
      <ColumnMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={ref?.current}
        updateStyle={updateStyle}
      />
    </div>
  );
}

export default App;
