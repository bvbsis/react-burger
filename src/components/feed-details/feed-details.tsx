import { FC, useMemo } from "react";
import { useSelector } from "../../utils/hook";
import styles from "./feed-details.module.css";


const FeedDetails: FC = () => {
  const { orders, total, totalToday } = useSelector(
    (store) => store.ws.ordersData
  );
  const orderNumbersInProcess = useMemo(() => {
    const filteredOrders = orders
      ? orders.filter((order) => order.status === "created" || order.status === 'pending')
      : null;
    return filteredOrders ? filteredOrders.map((order) => order.number) : null;
  }, [orders]);

  const orderNumbersDone = useMemo(() => {
    const filteredOrders = orders
      ? orders.filter((order) => order.status === "done")
      : null;
    return filteredOrders ? filteredOrders.map((order) => order.number) : null;
  }, [orders]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <span className={`text text_type_main-medium`}>Готовы:</span>
          <div className={styles.smallContainer}>
            {orderNumbersDone?.map((number, index) => {
              return (
                <span
                  key={index}
                  style={{ color: "#00CCCC" }}
                  className={`${styles.smallDigits} text text_type_digits-default`}
                >
                  {number}
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <div>
            <span className="text text_type_main-medium">В работе:</span>
            <div className={styles.smallContainer}>
              {orderNumbersInProcess?.map((number, index) => {
                return (
                  <span
                    key={index}
                    className={`${styles.smallDigits} text text_type_digits-default`}
                  >
                    {number}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.largeContainer}>
        <span className="text text_type_main-medium">
          {"Выполнено за все время:"}
        </span>
        <span className="text text_type_digits-large">{total ? total : 0}</span>
      </div>
      <div className={styles.largeContainer}>
        <span className="text text_type_main-medium">
          {"Выполнено за сегодня:"}
        </span>
        <span className="text text_type_digits-large">
          {totalToday ? totalToday : 0}
        </span>
      </div>
    </div>
  );
};

export default FeedDetails;
