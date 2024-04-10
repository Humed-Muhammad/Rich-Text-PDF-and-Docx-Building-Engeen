import { JSONRepresentation } from "../types";

export function decodeHtmlElements(jsonElements: JSONRepresentation[]) {
  function createElement(elementData: JSONRepresentation) {
    const { tagName, attributes, children } = elementData;
    const element = document.createElement(tagName);

    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(createElement(child));
      }
    });

    return element;
  }

  const rootElement = document.createElement("div");
  jsonElements.forEach((elementData) => {
    const element = createElement(elementData);
    rootElement.appendChild(element);
  });

  return rootElement.innerHTML;
}
