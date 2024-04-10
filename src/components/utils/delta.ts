/* eslint-disable @typescript-eslint/no-explicit-any */
interface DeltaOp {
  insert?: string | null;
  attributes?: { [key: string]: any };
  delete?: number;
}

export interface Delta {
  ops: DeltaOp[];
}

export function htmlToDelta(element: HTMLElement): Delta {
  const delta: Delta = { ops: [] };

  function traverse(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text && text.length > 0) {
        delta.ops.push({ insert: text });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = (node as HTMLElement).tagName.toLowerCase();

      if (tagName === "b" || tagName === "strong") {
        delta.ops.push({
          insert: node.textContent,
          attributes: { bold: true },
        });
      } else if (tagName === "i" || tagName === "em") {
        delta.ops.push({
          insert: node.textContent,
          attributes: { italic: true },
        });
      } else if (tagName === "u") {
        delta.ops.push({
          insert: node.textContent,
          attributes: { underline: true },
        });
      } else if (tagName === "s" || tagName === "del") {
        delta.ops.push({
          insert: node.textContent,
          attributes: { strike: true },
        });
      } else if (tagName === "br") {
        delta.ops.push({ insert: "\n" });
      }

      for (const childNode of node.childNodes) {
        traverse(childNode);
      }
    }
  }

  traverse(element);
  return delta;
}

export function deltaToHtml(delta: Delta): string {
  const container = document.createElement("div");

  for (const op of delta.ops) {
    if (op.insert) {
      if (op.attributes) {
        const element = document.createElement("span");
        for (const [key, value] of Object.entries(op.attributes)) {
          element.style[Number(key)] = value;
        }
        element.textContent = op.insert;
        container.appendChild(element);
      } else {
        const textNode = document.createTextNode(op.insert);
        container.appendChild(textNode);
      }
    } else if (op.delete) {
      // Handle delete operation if needed
    }
  }

  return container.innerHTML;
}
