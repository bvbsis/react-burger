import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import ModalOverlay from "./modal-overlay/modal-overlay";
import close_button from "../../images/close_button.svg";

import modalStyles from "./modal.module.css";

const Modal = React.memo(({ children, handleClose }) => {
  React.useEffect(() => {
    const escapeClose = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", escapeClose);
    return () => document.body.removeEventListener("keydown", escapeClose);
  }, [handleClose]);

  return ReactDOM.createPortal(
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
    document.getElementById("react-modals")
  );
});

React.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
