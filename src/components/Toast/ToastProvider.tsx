"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Toast, { type ToastVariant } from "./Toast";
import styles from "./Toast.module.scss";

export type ToastOptions = {
  text: string;
  variant?: ToastVariant;
  duration?: number;
};

export type ToastControls = {
  showToast: (options: ToastOptions) => number;
  dismissToast: (id: number) => void;
};

export const ToastContext = createContext<ToastControls | null>(null);

type ActiveToast = ToastOptions & { id: number; leaving: boolean };

const DEFAULT_DURATION = 5 * 1000;

// Must outlast the .toast transition in Toast.module.scss, or toasts vanish mid-fade.
const EXIT_DURATION = 200;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { ...options, id, leaving: false }]);
    return id;
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id ? { ...toast, leaving: true } : toast,
      ),
    );
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const controls = useMemo(
    () => ({ showToast, dismissToast }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext value={controls}>
      {children}
      <div className={styles.stack} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={dismissToast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext>
  );
}

function ToastItem({
  toast,
  onDismiss,
  onRemove,
}: {
  toast: ActiveToast;
  onDismiss: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const { id, text, variant, leaving, duration = DEFAULT_DURATION } = toast;

  useEffect(() => {
    if (leaving) {
      return;
    }
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, leaving, onDismiss]);

  useEffect(() => {
    if (!leaving) {
      return;
    }
    const timer = setTimeout(() => onRemove(id), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [id, leaving, onRemove]);

  return <Toast variant={variant} text={text} leaving={leaving} onDismiss={() => onDismiss(id)} />;
}
