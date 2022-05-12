import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import ModalOverlay from "./modal-overlay/modal-overlay";
import close_button from "../../images/close_button.svg";

import modalStyles from "./modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/modal";

const Modal = React.memo(({ children }) => {
  const dispatch = useDispatch();
  const { isOpen, heading } = useSelector((store) => store.modal);

  const closeModal = useCallback(() => {
    dispatch({
      type: CLOSE_MODAL,
    });
  }, [dispatch]);

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
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Modal;
