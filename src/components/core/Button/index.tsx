import { CoreButtonProps } from "@/components/types";
import { Button } from "@/components/ui/button";

export const CoreButton = ({
  active,
  children,
  color,
  bgColor,
  ...rest
}: CoreButtonProps) => {
  return (
    <Button
      size="icon"
      className={`text-gray-500 rounded mx-1 py-0 ${
        bgColor || active ? `bg-gray-800 text-white` : "bg-white"
      } ${color || active ? "white" : ""} hover:${
        active ? "bg-gray-800" : "bg-white"
      }`}
      {...rest}
    >
      {children}
    </Button>
  );
};
