import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

// Base Modal Component
const Modal = ({
  isOpen,
  onClose,
  children,
  title = '',
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  // Sizes mapping
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'w-full max-w-full'
  };

  // Variant mapping
  const variantClasses = {
    default: 'bg-background-light border border-primary/20',
    danger: 'bg-red-900/50 border border-red-500/30',
    success: 'bg-green-900/50 border border-green-500/30',
    warning: 'bg-yellow-900/50 border border-yellow-500/30'
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Add escape key listener
      const handleEscape = e => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);

      // Cleanup function
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // If modal is not open, return null
  if (!isOpen) return null;
  return createPortal(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
      <div className={`
          relative 
          rounded-xl 
          shadow-modal 
          p-6 
          w-full 
          ${sizeClasses[size]} 
          ${variantClasses[variant]} 
          ${className}
          text-white
          space-y-4
          rtl:text-right
          ltr:text-left
        `} aria-labelledby="modal-title">
        {/* Close Button */}
        <button onClick={onClose} className="
            absolute 
            top-4 
            right-4 
            rtl:left-4 
            rtl:right-auto 
            text-white 
            hover:text-primary 
            transition-colors
            focus:outline-none 
            focus:ring-2 
            focus:ring-primary
            rounded-full
            p-2
          " aria-label="إغلاق">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        {title && <h2 id="modal-title" className="
              text-2xl 
              font-bold 
              mb-4 
              text-white
              border-b 
              border-primary/20 
              pb-2
            ">
            {title}
          </h2>}

        {/* Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>, document.body);
};

// Confirmation Modal
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد',
  message = 'هل أنت متأكد؟',
  confirmText = 'نعم',
  cancelText = 'لا'
}) => {
  return <Modal isOpen={isOpen} onClose={onClose} title={title} variant="danger">
      <div className="text-center space-y-6">
        <p className="text-lg text-gray-300 mb-4">{message}</p>
        
        <div className="flex justify-center space-x-4 rtl:space-x-reverse">
          <Button variant="danger" onClick={onConfirm} className="px-6 py-2">
            {confirmText}
          </Button>
          
          <Button variant="ghost" onClick={onClose} className="px-6 py-2">
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>;
};

// Alert Modal
const AlertModal = ({
  isOpen,
  onClose,
  title = 'تنبيه',
  message = '',
  type = 'info'
}) => {
  const typeStyles = {
    info: 'bg-blue-900/50 border-blue-500/30 text-blue-300',
    success: 'bg-green-900/50 border-green-500/30 text-green-300',
    warning: 'bg-yellow-900/50 border-yellow-500/30 text-yellow-300',
    danger: 'bg-red-900/50 border-red-500/30 text-red-300'
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={title} variant={type} size="md">
      <div className="text-center">
        <p className={`text-lg ${typeStyles[type]} mb-6`}>{message}</p>
        
        <Button variant="primary" onClick={onClose} className="px-6 py-2">
          حسنًا
        </Button>
      </div>
    </Modal>;
};

// Export all modal types
export { Modal, ConfirmModal, AlertModal };
export default Modal;