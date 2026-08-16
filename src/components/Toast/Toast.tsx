import { CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from "../Icons";
import styles from "./Toast.module.scss";

export type ToastVariant = "error" | "info" | "success";

const toastIcons = {
  error: CircleXIcon,
  info: InfoIcon,
  success: CircleCheckIcon,
} as const;

type ToastProps = {
  variant?: ToastVariant;
  text: string;
  leaving?: boolean;
  onDismiss: () => void;
};

export default function Toast({
  variant = "info",
  text,
  leaving,
  onDismiss,
}: ToastProps) {
  const Icon = toastIcons[variant];

  return (
    <div
      className={`${styles.toast} ${styles[variant]} ${leaving ? styles.leaving : ""}`}
    >
      <Icon />
      <span>{text}</span>
      <XIcon onClick={onDismiss} className={styles.dismissIcon} />
    </div>
  );
}
