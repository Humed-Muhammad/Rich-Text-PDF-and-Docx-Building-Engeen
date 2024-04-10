import { useState } from "react";

export const useDisclosure = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const onOpen = () => {
    setOpen(true);
  };

  return {
    open,
    onOpen,
    onClose,
    toggle,
  };
};
