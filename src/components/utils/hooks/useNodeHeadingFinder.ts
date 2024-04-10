import { HeadingType, UseNodeHeadingFinder } from "@/components/types";
import { useCallback } from "react";

/**
 * Custom hook to find the heading node type within a given set of node types.
 * @returns An object with a `getNodeHeading` function that takes a current Focused Node Data, an array of node types, and a default node type. It returns the first matching node type found in the data, or the default node type if none of the specified node types are found.
 */

export const useNodeHeadingFinder = () => {
  const getNodeHeading = useCallback(
    ({
      focusedData,
      nodeTypes,
      defaultNodeType,
      traverseTreeByNodeName,
    }: UseNodeHeadingFinder): HeadingType | undefined => {
      for (const nodeType of nodeTypes) {
        const isNode = traverseTreeByNodeName(focusedData, nodeType).find(
          (node) => node === nodeType
        );
        if (isNode) {
          return nodeType;
        }
      }
      return defaultNodeType;
    },
    []
  );

  return { getNodeHeading };
};
