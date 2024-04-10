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
  value: string;
  label: string;
}

export const HeadingTextStyle: TextStyleType[] = [
  { label: "Normal Text", value: "P" },
  { label: "Heading 1", value: "H1" },
  { label: "Heading 2", value: "H2" },
  { label: "Heading 3", value: "H3" },
  { label: "Heading 4", value: "H4" },
  { label: "Heading 5", value: "H5" },
  { label: "Heading 6", value: "H6" },
];

export const fontFamily = [
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Inter", value: "Inter Variable, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Nunito", value: "Nunito, sans-serif" },
  { label: "Open-Sans", value: "Open sans Variable, sans-serif" },
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
