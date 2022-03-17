import React from "react";
import orderStyles from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = React.memo(({ modalState }) => {
  return (
    <div className={orderStyles.wrapper}>
      <span className="text text_type_digits-large mb-9">
        {modalState.order.identificator}
      </span>
      <span className="text text_type_main-medium mb-10">
        идентификатор заказа
      </span>
      <div className={orderStyles.check_mark} />
      <span className="text text_type_main-default mt-10">
        Ваш заказ начали готовить
      </span>
      <span
        style={{ color: "#8585AD" }}
        className="text text_type_main-default mt-2"
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
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
};

export default OrderDetails;
