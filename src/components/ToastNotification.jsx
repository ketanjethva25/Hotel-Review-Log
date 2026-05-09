import { useEffect } from 'react';

export default function ToastNotification({ message, type, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    info: 'bi-info-circle-fill',
    warning: 'bi-exclamation-triangle-fill'
  };

  const colors = {
    success: 'var(--accent-green)',
    error: 'var(--accent-red)',
    info: 'var(--accent-primary)',
    warning: 'var(--accent-amber)'
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 9999 }}
      id="toast-container"
    >
      <div className="toast-custom animate-slide-in d-flex align-items-center" role="alert">
        <div className="toast-body">
          <i
            className={`bi ${icons[type] || icons.info}`}
            style={{ color: colors[type] || colors.info, fontSize: '1.1rem' }}
          ></i>
          <span>{message}</span>
        </div>
        <button
          type="button"
          className="btn-close me-2"
          onClick={onClose}
          style={{ fontSize: '0.65rem' }}
        ></button>
      </div>
    </div>
  );
}
