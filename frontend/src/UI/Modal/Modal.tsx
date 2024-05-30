import React, { ReactNode, MouseEvent } from 'react';
import c from './Modal.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    isActive: boolean;
    setIsActive?: (active: boolean) => void;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, className, isActive, setIsActive, onClose, ...props }) => {
    const handleClose = () => {
        if (setIsActive) {
            setIsActive(false);
        }
        if (onClose) {
            onClose();
        }
    };

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`${c['modal-window']} ${isActive ? c['modal-active'] : ''}`}
            {...props}
            onClick={handleClose}
        >
            <div
                className={`${c['modal-window-content']} ${isActive ? c['modal-content-active'] : ''} ${className ?? ''}`}
                onClick={handleContentClick}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
