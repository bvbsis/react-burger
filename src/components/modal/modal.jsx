import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import ModalOverlay from "./modal-overlay/modal-overlay";
import close_button from "../../images/close_button.svg";

import modalStyles from "./modal.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/modal";

const Modal = React.memo(({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const handleClose = useCallback(() => {
    dispatch({
      type: CLOSE_MODAL,
    });
    if (state?.backgroundLocation) {
      navigate(-1);
    }
  }, [dispatch, navigate]);

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
