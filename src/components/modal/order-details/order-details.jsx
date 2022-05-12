import React from "react";
import PropTypes from "prop-types";

import orderStyles from "./order-details.module.css";
import { useSelector } from "react-redux";

const OrderDetails = React.memo(() => {
  const { orderNumber } = useSelector((store) => store.modal);
  return (
    <div className={orderStyles.orderDetails}>
      <span className="text text_type_digits-large mb-9">{orderNumber}</span>
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

OrderDetails.propTypes = {
  identificator: PropTypes.number.isRequired,
};

export default OrderDetails;
