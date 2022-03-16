import React, { useEffect } from "react";
import './styles.scss';
import * as P from 'prop-types';


export const Modal = ({ children, open, onClose }) => {
  useEffect(() => {
    function onEsc(event) {
      if (event.keyCode === 27) onClose();
    }

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    }
  }, [onClose]);
  if (!open) return null;

  function onOverlayClick() {
    onClose();
  }

  function onDialogClick(event) {
    event.stopPropagation();
  }

  return (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="modal_container" onClick={onDialogClick}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: P.node.isRequired,
  open: P.bool.isRequired,
  onClose: P.func.isRequired
}
