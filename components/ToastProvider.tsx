import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Toast from './Toast';

type ToastType = 'info' | 'success' | 'error';

type ToastAction = { label: string; onClick: () => void };

type ToastState = { id: number; message: string; type: ToastType; actions?: ToastAction[] } | null;

interface ToastContextType {
  showToast: (message: string, type?: ToastType, actions?: ToastAction[]) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const idRef = useRef(0);

  const hideToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((message: string, type: ToastType = 'info', actions?: ToastAction[]) => {
    idRef.current += 1;
    setToast({ id: idRef.current, message, type, actions });
  }, []);

  const value = useMemo(() => ({ showToast, hideToast }), [showToast, hideToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          actions={toast.actions}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}
