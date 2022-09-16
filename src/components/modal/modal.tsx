import React from "react";
import ReactDOM from "react-dom";

import ModalOverlay from "./modal-overlay/modal-overlay";
import close_button from "../../images/close_button.svg";

import modalStyles from "./modal.module.css";

interface IModalProps {
  handleClose: () => void;
}

const Modal: React.FC<IModalProps> = React.memo(({ children, handleClose }) => {
  React.useEffect(() => {
    const escapeClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", escapeClose);
    return () => document.body.removeEventListener("keydown", escapeClose);
  }, [handleClose]);

  const container = document.getElementById("react-modals");

  return container
    ? ReactDOM.createPortal(
        <ModalOverlay handleClose={handleClose}>
          <div className={modalStyles.modal}>
            <button
              onClick={handleClose}
              className={modalStyles.modal__closeButton}
            >
              <img src={close_button} alt="close" />
            </button>
            {children}
          </div>
        </ModalOverlay>,
        container
      )
    : null;
});


export default Modal;
