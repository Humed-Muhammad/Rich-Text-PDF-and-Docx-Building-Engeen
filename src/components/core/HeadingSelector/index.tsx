import { useAppDispatch } from "@/components/store/hooks";
import { setTextStyle } from "@/components/store/pdfGenSlice";
import {
  ChangeTextStyle,
  TextStyle,
} from "@/components/store/pdfGenSlice/types";
import { EditableContentArea } from "@/components/types";
import { HeadingTextStyle } from "@/components/utils/constants";
import { useDisclosure } from "@/components/utils/hooks/useDisclosure";

interface Props extends EditableContentArea {
  changeTextStyle: (textStyle: ChangeTextStyle) => Promise<void>;
  textStyle: TextStyle;
}

export const HeadingSelector = ({ changeTextStyle, textStyle }: Props) => {
  const { open, toggle } = useDisclosure();
  const dispatch = useAppDispatch();
  return (
    <div className="pdfx-select-container pdfx-margin-x-2">
      <div>
        <button
          type="button"
          onClick={toggle}
          onBlur={() => setTimeout(toggle, 200)}
          className="pdfx-select-button pdfx-button"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {textStyle.heading.label}
          <svg
            className="pdfx-selector-svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="pdfx-select-list-container"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {HeadingTextStyle.map((headingTextStyle, index) => (
            <p
              key={index}
              className="pdfx-select-list-item"
              role="menuitem"
              id="menu-item-0"
              onClick={() => {
                dispatch(
                  setTextStyle({ ...textStyle, heading: headingTextStyle })
                );
                changeTextStyle(headingTextStyle);
              }}
            >
              {headingTextStyle.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
