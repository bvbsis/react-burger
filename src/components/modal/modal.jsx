import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import modalStyles from "./modal.module.css";

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
      if (e.keyCode === 27) {
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L9 7.58579L16.2929 0.292893C16.6834 -0.0976311 17.3166 -0.0976311 17.7071 0.292893C18.0976 0.683417 18.0976 1.31658 17.7071 1.70711L10.4142 9L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L9 10.4142L1.70711 17.7071C1.31658 18.0976 0.683417 18.0976 0.292893 17.7071C-0.0976311 17.3166 -0.0976311 16.6834 0.292893 16.2929L7.58579 9L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                  fill="#F2F2F3"
                />
              </svg>
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
