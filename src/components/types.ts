/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CSSProperties,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import { NodeStyle, TextStyleType } from "./utils/constants";
import { useTextStyleChange } from "./utils/hooks/useTextStyleChange";
import { StyleUpdater } from "./utils/hooks/useSelectionStyle";

export type EditableContentArea = {
  contentRef?: HTMLDivElement | null | undefined;
  content?: Delta;
};

export type Size = { width: number | string; height: number | string };
export interface WritingAreaOptions extends EditableContentArea {
  size?: Size;
  changeTextStyle: ReturnType<typeof useTextStyleChange>;
  hideCustomMenu: () => void;
  updateStyle: StyleUpdater;
  id?: string;
}

export interface SheetProps {
  size: Size;
  customCommand: () => void;
  id: string | undefined;
  content?: Delta | undefined;
}

export type HeadingType = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "P";
export type FontFamilyType =
  | "Poppins"
  | "Lato"
  | "Nunito"
  | "Open Sans"
  | "Inter"
  | "Roboto";

export type TypeOfNode = "text" | "element" | null;
export interface ParsedTextNode {
  type: TypeOfNode;
  value?: string;
}

export interface ParsedElementNode {
  type: TypeOfNode;
  tag?: string;
  attributes?: Record<string, string>;
  children?: ParsedNode[];
}

export interface ParsedNode extends ParsedTextNode, ParsedElementNode {}

export interface FocusedData {
  focusedNode: Node | undefined | null;
  selection: Selection | null;
  range: Range | undefined;
}

export interface ParentTree {
  id: string | undefined;
  node: HTMLElement | Node | undefined | null;
}

export interface TraverseByNodeNameOptions {
  focusedNode: Node | null | undefined;
  traverseCount?: number;
  nodeName: NodeName;
}

export type NodeName =
  | "B"
  | "U"
  | "I"
  | "EM"
  | "STRONG"
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H5"
  | "H6"
  | "P";

export interface TraverseByCSSPropertiesOptions {
  focusedNode: Node | null | undefined;
  traverseCount?: number;
  property: keyof CSSProperties;
}

export type TraverseByNodeName = (
  focusedData: FocusedData,
  nodeName: NodeName
) => string[];

export type TraverseByCSSProperties = (
  focusedData: FocusedData,
  property: keyof CSSProperties
) => string | undefined;
export interface UseGetTextProperties {
  focusedData: FocusedData;
  traverseTreeByNodeName: TraverseByNodeName;
  traverseTreeByCSSProperties: TraverseByCSSProperties;
}

export interface UseNodeHeadingFinder
  extends Omit<UseGetTextProperties, "traverseTreeByCSSProperties"> {
  nodeTypes: HeadingType[];
  defaultNodeType: HeadingType;
}

export interface JSONRepresentation {
  tagName: string;
  attributes: { [key: string]: string };
  children: (JSONRepresentation | string)[];
}

export interface UseSpanOptions {
  focusedData: Partial<FocusedData>;
  style?: Partial<CSSStyleDeclaration>;
}

export interface CreateSpanElement extends UseSpanOptions {
  addId?: boolean;
}

export type FunctionTypeCSSProperty = () => IterableIterator<string>;

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface SideBarProps
  extends EditableContentArea,
    ReturnType<typeof useTextStyleChange> {
  updateStyle: StyleUpdater;
}

export type ValidKeys = "b" | "a" | "i" | "u" | "r";
export interface KeyCombinationOptions {
  key: ValidKeys;
  combinationKey?: "ctrlKey" | "shiftKey" | "altKey";
  callback?: () => void;
  keepDefaultBehavior?: boolean;
}

export interface CoreButtonProps extends ButtonProps {
  active?: boolean;
  color?: string;
  bgColor?: string;
  children?: Array<ReactNode> | ReactNode | string | number | null | undefined;
  ref?: Ref<HTMLButtonElement> | undefined;
}

export type HandleNodeStyle = (
  options: HandleNodeStyleOptions
) => Promise<void>;

export type StyleProperty = keyof Omit<
  CSSStyleDeclaration,
  "length" | "parentRule"
>;

export type StylePropertyCSSDeclaration = string &
  (() => IterableIterator<string>) &
  ((index: number) => string) &
  ((property: string) => string) &
  ((
    property: string,
    value: string | null,
    priority?: string | undefined
  ) => void);

export type HandleNodeStyleOptions = {
  toggle: boolean;
  type: NodeStyle;
  customValue?: string | number;
  stateValue?: TextStyleType;
  fallBackValue?: string | number;
};

export interface TableGeneratorOptions extends EditableContentArea {
  rows: number;
  columns: number;
  focusedData: Partial<FocusedData> | undefined;
}

export interface TableRowGeneratorOptions {
  columns: number;
}

export interface Position {
  x?: number;
  y?: number;
}

export type Alignment = "center" | "right" | "left";
export interface TextAlignmentExeCommand {
  focusedData: Partial<FocusedData>;
  alignment: Alignment;
  value?: string;
}

export type ColumnOptionHook = {
  activeColTr: Element | undefined;
  activeColTd: ActiveColumn | undefined;
  insertToRights?: boolean;
};

export interface ActiveColumn {
  td: Element | undefined;
  index: number;
}

export interface Delta {
  ops: Operation[];
}

export interface Operation {
  insert?: string | object;
  delete?: number;
  attributes?: { [key: string]: any };
}
