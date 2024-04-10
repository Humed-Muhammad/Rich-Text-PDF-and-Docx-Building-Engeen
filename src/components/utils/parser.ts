import { JSONRepresentation } from "../types";

export function parseHtmlToJson(
  contentEditableElement: HTMLDivElement
): (string | JSONRepresentation)[] | null {
  function parseElement(element: Element): JSONRepresentation {
    const tagName = element.tagName.toLowerCase();
    const attributes: { [key: string]: string } = {};
    const children: (JSONRepresentation | string)[] = [];

    const attributeNodes = element.attributes;
    for (let i = 0; i < attributeNodes.length; i++) {
      const attributeNode = attributeNodes.item(i);
      if (attributeNode) {
        attributes[attributeNode.name] = attributeNode.value;
      }
    }

    const childNodes = element.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes.item(i);
      if (childNode.nodeType === 1) {
        const childElement = childNode as Element;
        const childHtmlElement = parseElement(childElement);
        children.push(childHtmlElement);
      } else if (childNode.nodeType === 3) {
        const textContent = childNode.textContent || "";
        if (textContent) {
          children.push(textContent);
        }
      }
    }

    return {
      tagName,
      attributes,
      children,
    };
  }

  if (contentEditableElement) {
    return parseElement(contentEditableElement).children;
  }

  return null;
}
