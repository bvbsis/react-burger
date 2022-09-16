import React from "react";
import orderStyles from "./order-details.module.css";
import { useParams } from "react-router-dom";

const OrderDetails: React.FC = React.memo(() => {
  const {number} = useParams();
  return (
    <div className={orderStyles.orderDetails}>
      <span className="text text_type_digits-large mb-9">{number}</span>
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

export default OrderDetails;
