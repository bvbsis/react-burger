import React from "react";
import PropTypes from "prop-types";

import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = React.memo(({ children, closeModal, isOpen }) => {
  const onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "overlay");
  }, [isOpen]);

  return (
    <div onClick={onOverlayClick} className={overlayStyles.modalOverlay}>
      {children}
    </div>
  );
});

React.propTypes = {
  children: PropTypes.Modal,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalOverlay;
