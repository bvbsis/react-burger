import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import close_button from "../../images/close_button.svg";

const Modal = React.memo(({ heading, children, closeModal, isOpen }) => {
  React.useEffect(() => {
    const escapeClose = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.body.addEventListener("keydown", escapeClose);

    return () => document.body.removeEventListener("keydown", escapeClose);
  }, [closeModal]);

  return isOpen
    ? ReactDOM.createPortal(
        <ModalOverlay closeModal={closeModal}>
          <div className={modalStyles.modal}>
            {heading ? (
              <span
                className={`${modalStyles.modal__heading} text text_type_main-large`}
              >
                {heading}
              </span>
            ) : null}
            <button
              onClick={closeModal}
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
  modalState: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    ingredient: PropTypes.object.isRequired,
    heading: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]),
    order: PropTypes.shape({ identificator: PropTypes.string.isRequired }),
    currentModal: PropTypes.string,
  }),
  setModalState: PropTypes.func.isRequired,
};

export default Modal;
