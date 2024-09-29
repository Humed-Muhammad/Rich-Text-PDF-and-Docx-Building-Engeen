import { useCallback } from "react";
import { getParentTreesByCSSProperties, getParentTreesByNodeName } from "..";
import { FocusedData, NodeName } from "@/components/types";

export const useNodeTraverse = () => {
  const traverseTreeByNodeName = useCallback(
    (focusedData: FocusedData, nodeName: NodeName) =>
      getParentTreesByNodeName({
        focusedNode: focusedData?.focusedNode,
        nodeName: nodeName,
      }),
    []
  );

  const traverseTreeByCSSProperties = useCallback(
    (focusedData: FocusedData, property: keyof React.CSSProperties) => {
      if (property === "fontSize") {
        console.log({ focusedData, property });
      }
      return getParentTreesByCSSProperties({
        focusedNode: focusedData?.focusedNode,
        property,
      })[property];
    },
    []
  );

  return {
    traverseTreeByNodeName,
    traverseTreeByCSSProperties,
  };
};
