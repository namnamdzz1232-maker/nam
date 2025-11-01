
import React from 'react';
import { CloseIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-lg transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-text">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-text">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
