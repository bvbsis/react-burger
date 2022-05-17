import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import ModalOverlay from "./modal-overlay/modal-overlay";
import close_button from "../../images/close_button.svg";

import modalStyles from "./modal.module.css";
import { useSelector } from "react-redux";

const Modal = React.memo(({ children, handleClose }) => {
  const { isOpen, heading } = useSelector((store) => store.modal);
  React.useEffect(() => {
    const escapeClose = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", escapeClose);

    return () => document.body.removeEventListener("keydown", escapeClose);
  }, [handleClose]);

  return isOpen
    ? ReactDOM.createPortal(
        <ModalOverlay handleClose={handleClose}>
          <div className={modalStyles.modal}>
            {heading ? (
              <span
                className={`${modalStyles.modal__heading} text text_type_main-large`}
              >
                {heading}
              </span>
            ) : null}
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
      )
    : null;
});

React.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
