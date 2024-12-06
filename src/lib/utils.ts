/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delta, HeadingType, Operation } from "@/components/types";
import { hasCommonElements } from "@/components/utils";
import { headingNodeName, styleNodeName } from "@/components/utils/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function htmlToDelta(html: string): Delta {
  const container = document.createElement("div");
  container.innerHTML = html;

  const delta: Delta = { ops: [] };

  function traverse(
    element: HTMLElement,
    parentAttributes: { [key: string]: any } | null
  ) {
    Array.from(element.childNodes).forEach((node) => {
      const op: Operation = {};

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue?.replace(/\n/g, "");
        if (text) {
          op.insert = text;
          if (parentAttributes) {
            op.attributes = { ...parentAttributes };
          }
          delta.ops.push(op);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const childElement = node as HTMLElement;
        const tagName = childElement.tagName;

        if (["BR"].includes(tagName)) {
          op.insert = "\n";
          if (parentAttributes) {
            op.attributes = { ...parentAttributes };
          }
          delta.ops.push(op);
        } else if (
          styleNodeName.includes(tagName) ||
          headingNodeName.includes(tagName as HeadingType) ||
          childElement.getAttribute("style")
        ) {
          const sx = childElement.getAttribute("style");
          const attributes: { [key: typeof tagName]: any } = {
            ...parentAttributes,
          };
          const style = [];
          if (sx) {
            style.push(sx);
            attributes["style"] = style[0];
          }
          if (
            styleNodeName.includes(tagName) ||
            headingNodeName.includes(tagName as HeadingType)
          ) {
            if (tagName === "DIV") {
              op.insert = "\n";
              if (parentAttributes) {
                op.attributes = { ...parentAttributes };
              }
              delta.ops.push(op);
            } else {
              attributes[tagName] = true;
            }
          }

          traverse(childElement, attributes);
        } else if (tagName === "TABLE") {
          const tableDelta = parseTableToDelta(
            childElement as HTMLTableElement
          );

          //@ts-ignore
          delta.ops = delta.ops.concat(tableDelta.ops);
        } else {
          traverse(childElement, parentAttributes);
        }
      }
    });
  }

  traverse(container, null);

  return delta;
}

export function deltaToHtml(delta: Delta): string {
  let html = "";
  // let currentCellIndex = 0;

  let parentTag = "";
  delta.ops.forEach((op, index) => {
    //Inserts
    // const prevInsert = delta.ops[index - 1]?.insert;
    // const currentInsert = delta.ops[index]?.insert;
    const nextInsert = delta.ops[index + 1]?.insert;
    //@Attrs
    const prevAttrs = Object.keys(delta.ops[index - 1]?.attributes ?? {});
    const currentAttrs = Object.keys(delta.ops[index]?.attributes ?? {});
    // const futureAttrs = Object.keys(delta.ops[index + 1]?.attributes ?? {});
    if (op.insert) {
      if (
        op.insert === "\n" &&
        !hasCommonElements(prevAttrs, headingNodeName)
      ) {
        html += "<br>";
        parentTag = "";
      } else if (op.attributes && op.attributes.table) {
        html += "<table>";
      } else if (op.attributes && op.attributes.row) {
        html += "<tr>";
        // currentCellIndex = 0;
      } else if (op.attributes && op.attributes.cell) {
        const styleAttribute = op.attributes?.[`style`]
          ? `style="${op.attributes?.[`style`]}"`
          : "";
        html += `<td ${styleAttribute}>${op.attributes.content ?? ""}</td>`;
        // currentCellIndex++;
      } else {
        if (!Object.keys(op.attributes ?? {}).length && op.insert !== "\n") {
          html += `<span>`;
          // console.log("span", op.insert);
        } else if (
          op.insert &&
          op.attributes?.["style"] &&
          !hasCommonElements(currentAttrs, headingNodeName)
        ) {
          const style = op.attributes?.style;
          html += `<span style="${style ?? ""}">`;
        }

        // if (op.attributes) {
        //   const styleAttribute = op.attributes?.[`style`];

        //   if (op.attributes.H1 && parentTag !== "h1") {
        //     html += `<h1 style="${styleAttribute}">`;
        //     parentTag = "h1";
        //   }
        //   if (op.attributes.H2 && parentTag !== "h2") {
        //     html += `<h2 style="${styleAttribute}">`;
        //     parentTag = "h2";
        //   }
        //   if (op.attributes.H3 && parentTag !== "h3") {
        //     html += `<h3 style="${styleAttribute}">`;
        //     parentTag = "h3";
        //   }
        //   if (op.attributes.H4 && parentTag !== "h4") {
        //     html += `<h4 style="${styleAttribute}">`;
        //     parentTag = "h4";
        //   }
        //   if (op.attributes.H5 && parentTag !== "h5") {
        //     html += `<h5 style="${styleAttribute}">`;
        //     parentTag = "h5";
        //   }
        //   if (op.attributes.H6 && parentTag !== "h6") {
        //     html += `<h6 style="${styleAttribute}">`;
        //     parentTag = "h6";
        //   }
        //   if (op.attributes.P) {
        //     html += `<p style="${styleAttribute}">`;
        //   }
        //   if (op.attributes.B) {
        //     html += `<b style="${styleAttribute}">`;
        //   }
        //   if (op.attributes.I) {
        //     html += `<i style="${styleAttribute}">`;
        //   }
        //   if (op.attributes.U) {
        //     html += `<u style="${styleAttribute}">`;
        //   }
        // }

        html += op.insert;
        if (
          (op.insert && !Object.keys(op?.attributes ?? {}).length) ||
          (op.insert &&
            op.attributes?.["style"] &&
            !hasCommonElements(currentAttrs, headingNodeName))
        ) {
          // console.log("second", op.insert);
          html += "</span>";
        }
        // if (op.attributes) {
        //   if (op.attributes.H1 && nextInsert === "\n") {
        //     html += "</h1>";
        //     parentTag = "";
        //   }
        //   if (op.attributes.H2 && nextInsert === "\n") {
        //     html += "</h2>";
        //     parentTag = "";
        //   }
        //   if (op.attributes.H3 && nextInsert === "\n") {
        //     html += "</h3>";
        //     parentTag = "";
        //   }
        //   if (op.attributes.H4 && nextInsert === "\n") {
        //     html += "</h4>";
        //     parentTag = "";
        //   }
        //   if (op.attributes.H5 && nextInsert === "\n") {
        //     html += "</h5>";
        //     parentTag = "";
        //   }
        //   if (op.attributes.H6 && nextInsert === "\n") {
        //     html += "</h6>";
        //     parentTag = "";
        //   }
        //   if (op.attributes.P) {
        //     html += "</p>";
        //   }
        //   if (op.attributes.U) {
        //     html += "</u>";
        //   }
        //   if (op.attributes.I) {
        //     html += "</i>";
        //   }
        //   if (op.attributes.B) {
        //     html += "</b>";
        //   }
        // }
      }
    } else if (op.delete) {
      html += `<del>${op.delete}</del>`;
    }
  });

  return html;
}

function parseTableToDelta(table: HTMLTableElement) {
  const delta: { ops: Array<{ insert: object; attributes: object }> } = {
    ops: [],
  };

  // Add table start marker
  delta.ops.push({ insert: { table: null }, attributes: { table: true } });

  // Iterate over each row in the table
  const rows = Array.from(table.querySelectorAll("tr"));
  rows.forEach((row) => {
    // Add row marker
    delta.ops.push({ insert: { row: null }, attributes: { row: true } });

    // Iterate over each cell in the row
    const cells = Array.from(row.querySelectorAll("td, th"));
    cells.forEach((cell) => {
      // Add cell marker
      delta.ops.push({
        insert: { cell: null },
        attributes: {
          cell: true,
          content: cell.innerHTML,
          style: cell.getAttribute("style"),
        },
      });
    });
  });

  return delta;
}
