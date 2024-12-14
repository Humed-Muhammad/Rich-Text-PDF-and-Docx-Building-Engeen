import { useDrag } from "react-dnd";

export const useDraggable = (id: string, type: string) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return { drag, isDragging };
};
