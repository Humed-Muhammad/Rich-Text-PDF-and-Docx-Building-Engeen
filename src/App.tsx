import { WritingArea } from "./components/WritingArea";
import { SideBar } from "./components/sideBar";

import { useTextStyleChange } from "./components/utils/hooks/useTextStyleChange";
import { useContextMenu } from "./components/utils/hooks/useContextMenu";
import { ColumnMenu, RowMenu } from "./components/core/TableMenu";
import useSelectionStyle from "./components/utils/hooks/useSelectionStyle";
import { useTD } from "./components/utils/hooks/useTD";
import { useAppSelector } from "./components/store/hooks";
import {
  selectFocusedPaperId,
  selectPaperRef,
} from "./components/store/pdfGenSlice/selectors";

function App() {
  const focusedPaperId = useAppSelector(selectFocusedPaperId);
  const changeTextStyle = useTextStyleChange();
  const updateStyle = useSelectionStyle();
  const { hideCustomMenu } = useContextMenu(changeTextStyle.focusedData);
  useTD();
  const paperRef = useAppSelector((state) =>
    selectPaperRef(state, focusedPaperId)
  );
  // console.log(focusedPaperId);
  // console.log(paperRef);
  return (
    <div className="pdfx-container">
      <SideBar
        updateStyle={updateStyle}
        contentRef={paperRef?.ref}
        {...changeTextStyle}
      />
      {/* <Ruler /> */}
      <div className="pdfx-writing-area-container">
        <WritingArea
          changeTextStyle={changeTextStyle}
          hideCustomMenu={hideCustomMenu}
          contentRef={paperRef?.ref}
          updateStyle={updateStyle}
        />
      </div>
      <RowMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={paperRef?.ref}
        updateStyle={updateStyle}
      />
      <ColumnMenu
        changeTextStyle={changeTextStyle}
        hideCustomMenu={hideCustomMenu}
        contentRef={paperRef?.ref}
        updateStyle={updateStyle}
      />
    </div>
  );
}

export default App;
