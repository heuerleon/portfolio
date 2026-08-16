import { useContext } from "react";

import { ToastContext } from "./ToastProvider";

export default function useToasts() {
  const controls = useContext(ToastContext);

  if (!controls) {
    throw new Error("useToasts must be called inside a ToastProvider");
  }

  return controls;
}
