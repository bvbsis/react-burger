import { useSelector } from "react-redux";
import FeedElement from "./feed-element/feed-element";
import styles from "./feed.module.css";

const Feed = ({ height }) => {
  const { orders } = useSelector((store) => store.ws.ordersData);

  return orders ? (
    <div>
      <h2 className={`${styles.heading} text text_type_main-large`}>
        Лента заказов
      </h2>
      <ul style={{ maxHeight: height }} className={styles.container}>
        {orders.map((order) => (
          <FeedElement key={order._id} {...order} />
        ))}
      </ul>
    </div>
  ) : null;
};

export default Feed;
