import React, { useEffect } from "react";
import styles from './styles.module.css';


/*eslint-disable */
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
    <div className={styles.overlay} onClick={onOverlayClick}>
      <div className={styles.modal_container} onClick={onDialogClick}>
        {children}
      </div>
    </div>
  );
}
