import { CSSProperties } from "react";
import { HeadingType, StyleProperty } from "../types";

export const headingNodeName: HeadingType[] = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "P",
];

export const HeadingArray = ["H1", "H2", "H3", "H4", "H5", "H6"];
export const styleNodeName = ["B", "I", "U", "DIV"];

interface HeadingStyles {
  [key: string]: {
    [key in keyof CSSProperties]: string;
  };
}

export const headingStyles: HeadingStyles = {
  H1: {
    fontSize: "32px",
    color: "black",
  },
  H2: {
    fontSize: "28px",
    color: "black",
  },
  H3: {
    fontSize: "24px",
    color: "black",
  },
  H4: {
    fontSize: "20px",
    color: "black",
  },
  H5: {
    fontSize: "16px",
    color: "black",
  },
  H6: {
    fontSize: "14px",
    color: "black",
  },
};

export const eventKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

export const inlineElements = [
  "SPAN",
  "A",
  "STRONG",
  "EM",
  "LABEL",
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "CODE",
  "IMG",
  "BR",
  "B",
  "I",
];

export interface TextStyleType {
  value: Partial<CSSStyleDeclaration> | string;
  label: string;
}

export const HeadingTextStyle: TextStyleType[] = [
  { label: "Normal Text", value: { fontSize: "16px", fontWeight: "400" } },
  {
    label: "Heading 1",
    value: {
      fontSize: "32px",
      fontWeight: "700",
    },
  },
  {
    label: "Heading 2",
    value: {
      fontSize: "28px",
      fontWeight: "700",
    },
  },
  {
    label: "Heading 3",
    value: {
      fontSize: "24px",
      fontWeight: "700",
    },
  },
  {
    label: "Heading 4",
    value: {
      fontSize: "20px",
      fontWeight: "700",
    },
  },
  {
    label: "Heading 5",
    value: {
      fontSize: "16px",
      fontWeight: "700",
    },
  },
  {
    label: "Heading 6",
    value: {
      fontSize: "14px",
      fontWeight: "700",
    },
  },
];

export const fontFamily = [
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Inter", value: '"Inter Variable", sans-serif' },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Nunito", value: "Nunito, sans-serif" },
  { label: "Open-Sans", value: '"Open sans Variable, sans-serif"' },
];

export type NodeStyle = "bold" | "italic" | "fontSize" | "color" | "fontFamily";

export type NodeStyleObject = {
  [key in NodeStyle]: { style: StyleProperty; value?: string };
};

export const nodeStyleProperties: NodeStyleObject = {
  bold: {
    style: "fontWeight",
    value: "bolder",
  },
  italic: {
    style: "fontStyle",
    value: "italic",
  },
  fontSize: {
    style: "fontSize",
  },
  color: {
    style: "color",
  },
  fontFamily: {
    style: "fontFamily",
  },
};
