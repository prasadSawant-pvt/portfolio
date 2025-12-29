import React, { useEffect, useState } from 'react';

interface ToastProps {
  id?: string;
  message: string;
  type?: 'info' | 'success' | 'error';
  actions?: { label: string; onClick: () => void }[];
  onClose?: () => void;
}

export default function Toast({ message, type = 'info', actions, onClose }: ToastProps) {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!hovering && onClose) onClose();
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose, hovering]);

  const color = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-800';

  return (
    <div
      className={`fixed right-4 bottom-6 z-50 ${color} text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in`}
      role="status"
      aria-live="polite"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{message}</span>
        {actions && (
          <div className="flex gap-2 mt-1">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={() => {
                  action.onClick();
                  onClose && onClose();
                }}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        {!actions && (
          <button onClick={() => onClose && onClose()} aria-label="Dismiss" className="self-end opacity-80 hover:opacity-100">✕</button>
        )}
      </div>
    </div>
  );
}
