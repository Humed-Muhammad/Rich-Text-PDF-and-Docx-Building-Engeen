import { Position } from "@/components/types";
import { useEffect, useState } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Position>();
  useEffect(() => {
    document.addEventListener("mouseover", (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    });

    return () => {
      document.removeEventListener("mouseover", (event) => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      });
    };
  }, []);
  return {
    mousePosition,
  };
};
