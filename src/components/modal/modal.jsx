import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import modalStyles from "./modal.module.css";
import close_button from  "../../images/close_button.svg"

const Modal = React.memo(({ modalState, setModalState }) => {
  const onCloseClick = () => {
    setModalState({
      ...modalState,
      isOpen: false,
      heading: null,
      ingredient: {},
      currentModal: null,
    });
  };

  React.useEffect(() => {
    const callback = (e) => {
      if (e.key === 'Escape') {
        setModalState({
          ...modalState,
          heading: null,
          isOpen: false,
          ingredient: {},
          currentModal: null,
        });
      }
    };
    document.body.addEventListener("keydown", callback);

    return () => document.body.removeEventListener("keydown", callback);
  }, [modalState, setModalState]);

  return modalState.isOpen
    ? ReactDOM.createPortal(
        <ModalOverlay modalState={modalState} setModalState={setModalState}>
          <div className={modalStyles.modal}>
            {modalState.heading ? (
              <span
                className={`${modalStyles.modal__heading} text text_type_main-large`}
              >
                {modalState.heading}
              </span>
            ) : null}
            <button onClick={onCloseClick} className={modalStyles.modal__closeButton}>
              <img src={close_button} alt="close" />
            </button>
            {modalState.currentModal === "ingredient-details" ? (
              <IngredientDetails ingredient={modalState.ingredient} />
            ) : (
              <OrderDetails
                setModalState={setModalState}
                modalState={modalState}
              />
            )}
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
