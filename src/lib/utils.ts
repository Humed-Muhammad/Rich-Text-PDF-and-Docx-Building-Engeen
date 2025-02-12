/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delta, HeadingType, Operation } from "@/components/types";
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

  delta.ops.forEach((op) => {
    if (op.insert) {
      if (op.insert === "\n") {
        html += "<br>";
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
        if (typeof op.insert === "string") {
          html += `<span style="${op.attributes?.style ?? ""}">`;
        }

        if (op.attributes) {
          // if (op.attributes.DIV) {
          //   html += `<div style="${op.attributes?.[`DIV-style`] ?? ""}">`;
          // }
          // if (op.attributes.SPAN) {
          //   html += `<span style="${op.attributes?.[`SPAN-style`] ?? ""}">`;
          // }
          if (op.attributes && op.attributes.B) {
            // const styleAttribute = op.attributes?.[`B-style`]
            //   ? `style="${op.attributes?.[`B-style`]}"`
            //   : "";

            html += `<b>`;
          }
          if (op.attributes.I) {
            html += `<i>`;
          }
          if (op.attributes.U) {
            html += `<u>`;
          }
          if (op.attributes.H1) {
            html += `<h1>`;
          }

          if (op.attributes.H2) {
            html += `<h2>`;
          }
          if (op.attributes.H3) {
            html += `<h3>`;
          }
          if (op.attributes.H4) {
            html += `<h4>`;
          }
          if (op.attributes.H5) {
            html += `<h5>`;
          }
          if (op.attributes.H6) {
            html += `<h6>`;
          }
          if (op.attributes.P) {
            html += `<p>`;
          }
        }

        html += op.insert;
        if (typeof op.insert === "string") {
          html += "</span>";
        }
        if (op.attributes) {
          // if (op.attributes.DIV) {
          //   html += `</div>`;
          // }
          // if (op.attributes.SPAN) {
          //   html += `</span>`;
          // }
          if (op.attributes.U) {
            html += "</u>";
          }
          if (op.attributes.I) {
            html += "</i>";
          }
          if (op.attributes.B) {
            html += "</b>";
          }
          if (op.attributes.H1) {
            html += "</h1>";
          }
          if (op.attributes.H2) {
            html += "</h2>";
          }
          if (op.attributes.H3) {
            html += "</h3>";
          }
          if (op.attributes.H4) {
            html += "</h4>";
          }
          if (op.attributes.H5) {
            html += "</h5>";
          }
          if (op.attributes.H6) {
            html += "</h6>";
          }
          if (op.attributes.P) {
            html += "</p>";
          }
        }
      }
    } else if (op.delete) {
      html += `<del>${op.delete}</del>`;
    }
  });

  return html;
}

// function parseTableToDelta(table: HTMLTableElement): any {
//   const delta: any = { ops: [] };

//   // Add new line before table
//   delta.ops.push({ insert: "\n" });

//   // Add table start marker
//   delta.ops.push({ insert: { table: null }, attributes: { table: true } });

//   // Iterate over each row in the table
//   const rows = Array.from(table.querySelectorAll("tr"));
//   rows.forEach((row) => {
//     // Add new line before each row
//     delta.ops.push({ insert: "\n" });
//     // Add row marker
//     delta.ops.push({ insert: { row: null }, attributes: { row: true } });

//     // Iterate over each cell in the row
//     const cells = Array.from(row.querySelectorAll("td, th"));
//     cells.forEach((cell) => {
//       // Add new line before each cell
//       delta.ops.push({ insert: "\n" });
//       // Add cell marker
//       delta.ops.push({ insert: { cell: null }, attributes: { cell: true } });

//       // Add cell content
//       delta.ops.push({ insert: cell.innerText.trim() });
//     });
//   });

//   // Add new line at the end of the table
//   delta.ops.push({ insert: "\n" });

//   return delta;
// }

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
