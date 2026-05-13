import React from 'react';
import ReactDOM from 'react-dom';
import './Auth.css';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    /* Si haces clic en el fondo gris, se cierra */
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          {children}
        </div>
      </div>

    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;