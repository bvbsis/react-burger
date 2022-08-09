import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import FeedElement from "./feed-element/feed-element";
import styles from "./feed.module.css";

const Feed = ({
  height,
  width,
  elementHeight,
  withStatus,
  gap,
  to,
  reverse,
}) => {
  const { orders } = useSelector((store) => store.ws.ordersData);

  const formattedOrders = useMemo(() => {
    const formattedOrders = [];
    if (reverse) {
      orders?.forEach((order) => {
        formattedOrders.unshift(order);
      });
    }
    return reverse ? formattedOrders : orders;
  }, [orders, reverse]);


  return formattedOrders ? (
    <ul style={{ maxHeight: height, width, gap }} className={styles.container}>
      {formattedOrders.map((order) => (
        <FeedElement
          key={order._id}
          {...order}
          withStatus={withStatus}
          elementHeight={elementHeight}
          to={to}
        />
      ))}
    </ul>
  ) : null;
};

export default Feed;
