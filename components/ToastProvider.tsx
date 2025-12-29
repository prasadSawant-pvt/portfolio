import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Toast from './Toast';

export type ToastType = 'info' | 'success' | 'error';

type ToastState = { id: number; message: string; type: ToastType } | null;

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
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

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    idRef.current += 1;
    setToast({ id: idRef.current, message, type });
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
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}
