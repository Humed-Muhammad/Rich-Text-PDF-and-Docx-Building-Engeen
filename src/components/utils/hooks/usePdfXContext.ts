import { Context } from "@/context/contextValue";
import { useContext } from "react";

export const usePdfXContext = () => {
  const context = useContext(Context);
  return { ...context };
};
