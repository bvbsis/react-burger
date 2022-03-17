import React from "react";
import PropTypes from "prop-types";
import orderStyles from "./order-details.module.css";

const OrderDetails = React.memo(({ modalState }) => {
  return (
    <div className={orderStyles.orderDetails}>
      <span className="text text_type_digits-large mb-9">
        {modalState.order.identificator}
      </span>
      <span className="text text_type_main-medium mb-10">
        идентификатор заказа
      </span>
      <div className={orderStyles.orderDetails__checkMark} />
      <span className="text text_type_main-default mt-10">
        Ваш заказ начали готовить
      </span>
      <span
        className={`${orderStyles.orderDetails__darkText} text text_type_main-default mt-2`}
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
