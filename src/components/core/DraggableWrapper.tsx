import { useDraggable } from "../utils/hooks/useDraggable";

export const DraggableWrapper = ({
  children,
  id,
}: {
  children: any;
  id: string;
}) => {
  const { drag, isDragging } = useDraggable(id, "writing-area");

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};
