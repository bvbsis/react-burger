import React from "react";
import overlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = React.memo(({ children, modalState, setModalState }) => {
  const onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      setModalState({
        ...modalState,
        heading: null,
        isOpen: false,
        ingredient: {},
        currentModal: null,
      });
    }
  };

  React.useEffect(() => {
    if (modalState.isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "overlay");
  }, [modalState]);

  return (
    <div onClick={onOverlayClick} className={overlayStyles.wrapper}>
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
