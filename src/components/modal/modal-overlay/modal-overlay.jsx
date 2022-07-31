import React from "react";
import PropTypes from "prop-types";

import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = React.memo(({ children, handleClose }) => {
  const onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  return (
    <div onClick={onOverlayClick} className={overlayStyles.modalOverlay}>
      {children}
    </div>
  );
});

React.propTypes = {
  children: PropTypes.Modal,
  handleClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
