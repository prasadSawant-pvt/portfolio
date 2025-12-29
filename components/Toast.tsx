import React, { useEffect } from 'react';

interface ToastProps {
  id?: string;
  message: string;
  type?: 'info' | 'success' | 'error';
  onClose?: () => void;
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 2200);
    return () => clearTimeout(t);
  }, [onClose]);

  const color = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-800';

  return (
    <div className={`fixed right-4 bottom-6 z-50 ${color} text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in`} role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span className="font-semibold">{message}</span>
        <button onClick={() => onClose && onClose()} aria-label="Dismiss" className="ml-2 opacity-80 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}
