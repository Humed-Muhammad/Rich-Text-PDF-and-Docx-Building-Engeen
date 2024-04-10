import { ColumnOptionHook, TableRowGeneratorOptions } from "../types";

export const generateTableRow = ({ columns }: TableRowGeneratorOptions) => {
  const tr = document.createElement("tr");

  // Create table rows
  for (let i = 0; i < 1; i++) {
    const tds: Node[] = [];

    // Create table columns
    for (let j = 0; j < columns; j++) {
      const td = document.createElement("td");
      td.contentEditable = "true";
      td.setAttribute("class", "pdfx-td");
      tds.push(td);
    }

    tr.setAttribute("class", "pdfx-tr");
    for (const td of tds) {
      tr.appendChild(td);
    }
  }

  return tr;
};

export const generateTableColumn = ({
  activeColTd,
  activeColTr,
  insertToRights,
}: ColumnOptionHook) => {
  const td = document.createElement("td");
  const tbody = activeColTr?.parentElement;

  if (tbody) {
    Array.from(tbody.children).forEach((node) => {
      const childNodes = Array.from(node.childNodes);
      const index = activeColTd?.index;

      if (index !== -1) {
        if (insertToRights) {
          const newTdAfter = td.cloneNode();
          node.insertBefore(newTdAfter, childNodes[Number(index) + 1]);
        } else {
          const newTdBefore = td.cloneNode();
          node.insertBefore(newTdBefore, childNodes[index as number]);
        }
      }
    });
  }
};
