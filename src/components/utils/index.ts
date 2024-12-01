/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, KeyboardEvent } from "react";
import {
  CreateSpanElement,
  KeyCombinationOptions,
  ParentTree,
  TableGeneratorOptions,
  TextAlignmentExeCommand,
  TraverseByCSSPropertiesOptions,
  TraverseByNodeNameOptions,
  UseSpanOptions,
} from "../types";
import { NodeStyle, inlineElements } from "./constants";
import { v4 } from "uuid";
import { convertToCSSProperty } from "./helpers";

/**
 * Retrieves the color properties of the selected element and its root ancestor.
 * @returns {Object} An object containing the color properties of the selected element and its root ancestor.
 */
export function getColorPropertiesOfSelectedElement() {
  const selectedText = window.getSelection();
  const selectedElementNode = selectedText?.focusNode;
  const selectedElement =
    selectedElementNode instanceof Element
      ? selectedElementNode
      : selectedElementNode?.parentNode;
  const selectedElementRoot = selectedElement?.parentNode;

  const selectedElementColor = selectedElement
    ? window.getComputedStyle(selectedElement as Element).color
    : null;
  const selectedElementRootColor = selectedElementRoot
    ? window.getComputedStyle(selectedElementRoot as Element).color
    : null;

  return {
    selectedElementColor,
    selectedElementRootColor,
  };
}

export const alignTextHandler = (position: "center" | "left" | "right") => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      const selection = document.getSelection();
      const range = selection?.getRangeAt(0);

      const startContainer = range?.startContainer;

      if (
        startContainer?.nodeType === Node.TEXT_NODE &&
        startContainer.parentElement
      ) {
        if (inlineElements.includes(startContainer.parentElement.nodeName)) {
          startContainer.parentElement.style.display = "inline-block";
          startContainer.parentElement.style.width = "100%";
        }
        startContainer.parentElement.style.textAlign = position;
        range?.collapse(true);
      }
    });
  });
};

export const getTextContent = (node: Node | null | undefined): string => {
  if (!node) return "";
  if (node.nodeType === Node.TEXT_NODE) return node.textContent || "";

  let text = "";
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    text += getTextContent(childNodes[i]);
  }

  return text;
};

export function handleKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  focusedNode: Node | undefined | null
) {
  if (event.ctrlKey && event.key === "b" && focusedNode?.parentElement) {
    event.preventDefault(); // Prevent the default behavior of the Ctrl+B combination

    focusedNode.parentElement.style.fontWeight = "bold"; // Apply bold style to the span element
  }
}

export const getParentTrees = (
  focusedNode: Node | null | undefined,
  traverseCount: number = 5
) => {
  const parentTreeArray: ParentTree[] = [];
  let currentNode = focusedNode as HTMLElement | null | undefined;
  for (let i = 0; i < traverseCount; i++) {
    currentNode = currentNode?.parentElement;
    if (/writingArea/.test(currentNode?.id ?? "")) break;
    parentTreeArray.push({
      id: currentNode?.id ? currentNode.id : undefined,
      node: currentNode,
    });
  }
  return parentTreeArray;
};

export const getParentWritingAreaId = (
  focusedNode: Node | null | undefined
): string | undefined => {
  let currentNode = focusedNode as HTMLElement | null | undefined;

  while (currentNode) {
    if (/writingArea/.test(currentNode?.id ?? "")) {
      return currentNode?.id;
    }
    currentNode = currentNode.parentElement;
  }

  return undefined;
};

export const getParentTreesByNodeName = (
  options: TraverseByNodeNameOptions
) => {
  const { focusedNode, traverseCount = 5, nodeName } = options;
  const parentTreeArray: string[] = [];
  let currentNode = focusedNode as HTMLElement | null | undefined;

  for (let i = 0; i < traverseCount; i++) {
    currentNode = currentNode?.parentElement;
    if (currentNode?.nodeName === nodeName) {
      parentTreeArray.push(currentNode?.nodeName);
    }
  }
  return parentTreeArray;
};

export const getParentTreesByCSSProperties = (
  options: TraverseByCSSPropertiesOptions
): { [key in keyof CSSProperties]: string } => {
  const { focusedNode, traverseCount = 5, property } = options;
  const cssProperties: { [key in keyof CSSProperties]: string } = {};

  let currentNode = focusedNode as HTMLElement | null | undefined;
  for (let i = 0; i < traverseCount && currentNode; i++) {
    currentNode = currentNode.parentElement;
    if (
      currentNode &&
      currentNode.style[property as keyof CSSStyleDeclaration]
    ) {
      cssProperties[property] = currentNode.style[
        property as keyof CSSStyleDeclaration
      ] as string;
      return cssProperties;
    }
  }
  return cssProperties;
};

/**@deprecated this function is deprecated please use the @function getElementsInRange function */
export function traverseRange(startContainer: Node, endContainer: Node) {
  const selectedElements = new Set<HTMLElement>();
  let currentNode: Node | null = startContainer;

  while (currentNode && currentNode !== endContainer.nextSibling) {
    if (currentNode.nodeType === Node.ELEMENT_NODE) {
      const element = currentNode as HTMLElement;

      selectedElements.add(element);
      const childNodes = element.children;

      for (let i = 0; i < childNodes.length; i++) {
        const child = childNodes[i] as HTMLElement;
        child.style.color = "";
        const grandChildNodes = child.children;
        for (let j = 0; j < grandChildNodes.length; j++) {
          const grandChild = grandChildNodes[j] as HTMLElement;
          grandChild.style.color = "";
        }
      }
    }

    currentNode = currentNode.nextSibling;
    const childNodesOfCurrentNode = currentNode?.childNodes as NodeListOf<Node>;

    for (let i = 0; i < childNodesOfCurrentNode?.length; i++) {
      if (endContainer === childNodesOfCurrentNode?.[i]) {
        selectedElements.add(endContainer as HTMLElement);
        break;
      }
    }

    if (startContainer === endContainer) {
      break;
    }
  }

  return selectedElements;
}

export function getElementsInRange(range: Range | undefined): Set<HTMLElement> {
  if (!range) {
    return new Set();
  }

  const elements: Set<HTMLElement> = new Set();

  function isElementInRange(element: Node): boolean {
    return range?.intersectsNode(element) ?? false;
  }

  function traverseDOM(node: Node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (isElementInRange(node)) {
        elements.add(node as HTMLElement);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const parentElement = node.parentElement;
      if (parentElement && isElementInRange(parentElement)) {
        elements.add(parentElement);
      }
    }

    const childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      traverseDOM(childNodes[i]);
    }
  }

  const commonAncestor = range.commonAncestorContainer as HTMLElement;

  traverseDOM(commonAncestor);

  /**@ExtraCheck */

  const startContainerParent = range.startContainer.parentElement;
  const endContainerParent = range.endContainer.parentElement;

  if (
    startContainerParent?.nodeName === "SPAN" &&
    endContainerParent?.nodeName !== "SPAN"
  ) {
    const span = document.createElement("span");
    span.textContent = range.startContainer.textContent;

    const insertBeforeElement =
      range.endContainer.parentElement?.parentElement !== commonAncestor
        ? range.endContainer.parentElement?.parentElement
        : range.endContainer.parentElement;

    commonAncestor.insertBefore(span, insertBeforeElement as Node);
    range.startContainer.textContent = "";
    elements.add(span);
  } else if (
    startContainerParent?.nodeName !== "SPAN" &&
    endContainerParent?.nodeName === "SPAN"
  ) {
    const span = document.createElement("span");
    span.textContent = range.endContainer.textContent;

    commonAncestor.appendChild(span);
    range.endContainer.textContent = "";
    elements.add(span);
  }

  /**@ExtraCheckEnds */

  return elements;
}

export const createSpanElement = ({
  focusedData,
  style,
  addId = false,
}: CreateSpanElement) => {
  const { focusedNode, range, selection } = focusedData;
  const span = document.createElement("span");
  // const br = document.createElement("br");
  if (addId) {
    const uniqueId = v4();
    span.setAttribute("id", uniqueId);
  }

  if (style) {
    Object.keys(style).forEach((key) => {
      // Type assertion to ensure key is of type keyof CSSStyleDeclaration
      const styleKey = key as keyof Omit<
        CSSStyleDeclaration,
        "length" | "parentRule"
      >;
      span.style[styleKey] = style[styleKey] as any;
    });
  }

  span.innerText = focusedNode?.textContent as string;
  // span.appendChild(br);
  if (focusedNode) focusedNode.textContent = "";

  range?.insertNode(span);

  selection?.removeAllRanges();
  selection?.addRange(range as Range);
  selection?.collapseToEnd();
};

/**
 * The function `styleTheSelectedRange` creates a new span element with specified styles and inserts it
 * into the selected range within a focused element.
 * @param {UseSpanOptions}  - The `styleTheSelectedRange` function takes in an object with the
 * following properties:
 * @returns HTMLSpanElement.
 */
export const styleTheSelectedRange = ({
  focusedData,
  style,
}: UseSpanOptions): HTMLSpanElement => {
  const { range, selection, focusedNode } = focusedData;
  // const isTableData = focusedNode?.parentNode?.nodeName === "TD";
  // let span = document.createElement("span");

  const span = document.createElement("span");

  const promise = new Promise<HTMLSpanElement>((resolve) => {
    if (style) {
      Object.keys(style).forEach((key) => {
        // Type assertion to ensure key is of type keyof CSSStyleDeclaration
        const styleKey = convertToCSSProperty(key);
        span.style.setProperty(
          styleKey,
          `${style[key as keyof CSSStyleDeclaration]}`
        );
      });
    }
    resolve(span);
  });
  promise.then((span) => {
    const extractedContents = range?.extractContents();
    span.appendChild(extractedContents as Node);
    range?.deleteContents();
    range?.insertNode(span);
    // Adjust the selection to surround the new span element
    selection?.removeAllRanges();
    selection?.addRange(range as Range);
    // selection?.collapseToEnd();
  });
  return span;
  // } else {
  //   return focusedNode?.parentElement as HTMLElement;
  // }
};

export const valueTransformer = (
  value: number | string | undefined,
  type: NodeStyle
) => {
  const nodeStyleKey = ["fontSize"] as Array<NodeStyle>;
  if (nodeStyleKey.includes(type)) {
    return `${value}px`;
  }

  return value;
};

export function handleKeyCombination(
  event: KeyboardEvent,
  options: KeyCombinationOptions
): boolean {
  const {
    key,
    combinationKey = "ctrlKey",
    callback,
    keepDefaultBehavior,
  } = options;

  if (event[combinationKey]) {
    if (event.code === `Key${key.toUpperCase()}`) {
      !keepDefaultBehavior && event.preventDefault();
      if (callback) {
        callback();
      }
      return true;
    }
  }
  return false;
}

export function extractNumberFromString(value: string): number | null {
  const match = value.match(/\d+/);
  if (match) {
    return Number(match?.[0]);
  }
  return null;
}

export const generateTable = async ({
  rows,
  columns,
  contentRef,
  focusedData,
}: TableGeneratorOptions) => {
  const rowCols: Node[] = [];

  // Create table rows
  for (let i = 0; i < rows; i++) {
    const tds: Node[] = [];

    // Create table columns
    for (let j = 0; j < columns; j++) {
      const td = document.createElement("td");
      td.contentEditable = "true";
      td.setAttribute("class", "pdfx-td");
      tds.push(td);
    }

    const tr = document.createElement("tr");
    tr.setAttribute("class", "pdfx-tr");
    for (const td of tds) {
      tr.appendChild(td);
    }

    rowCols.push(tr);
  }

  const div = document.createElement("div");
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  for (const rowCol of rowCols) {
    tbody.appendChild(rowCol);
  }

  table.appendChild(tbody);
  table.setAttribute("class", "pdx-table");

  /**@Pdfx_Table_Container */
  div.appendChild(table);

  div.setAttribute("class", "pdfx-table-container");
  const tree = getParentTrees(focusedData?.focusedNode);

  /* The code is checking if a `Child` element exists in a tree structure. It first
 tries to access the last node's next sibling in the tree, and if it exists, it inserts a `div`
 element before that node. If the next sibling does not exist, it falls back to inserting the `div`
 element as a child of the content reference. */
  let Child = null;
  if (tree?.length > 0) {
    const lastNode = tree[tree.length - 1]?.node;
    if (lastNode) {
      Child = lastNode.nextSibling;
      if (!Child) {
        Child = lastNode;
      }
    }
  }

  // Wait for the DOM to update before inserting the div element
  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  if (Child) {
    contentRef?.insertBefore(div, Child as Node);
  } else {
    contentRef?.appendChild(div);
  }
};

export const styleAlignmentUsingExeCommand = ({
  focusedData,
  alignment,
}: TextAlignmentExeCommand) => {
  if (!document.execCommand) {
    const { focusedNode, range, selection } = focusedData;
    if (range && selection && focusedNode) {
      const div = document.createElement("div");
      div.style.setProperty("text-align", alignment);
      const contents = range.extractContents();
      div.appendChild(contents);
      range.insertNode(div);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  } else {
    const alignmentValue = {
      center: "JustifyCenter",
      left: "JustifyLeft",
      right: "JustifyRight",
    };
    document.execCommand(alignmentValue[alignment], false, "");
  }
};

export function hasCommonElements(arr1: string[], arr2: string[]): boolean {
  for (const item of arr2) {
    if (arr1.includes(item)) {
      return true;
    }
  }
  return false;
}
