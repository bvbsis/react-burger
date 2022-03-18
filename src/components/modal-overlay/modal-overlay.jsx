import React from "react";
import PropTypes from "prop-types";
import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = React.memo(({ children, closeModal, isOpen }) => {

  const onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal()
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

export default ModalOverlay;
