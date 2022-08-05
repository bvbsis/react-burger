import React from "react";
import { data } from "../../utils/data";
import FeedElement from "./feed-element/feed-element";
import styles from "./feed.module.css";

const Feed = () => {
  return (
    <>
      <h2 className={`${styles.heading} text text_type_main-large`}>
        Лента заказов
      </h2>
      {data.orders.map((order) => (
        <FeedElement key={order._id} {...order} />
      ))}
    </>
  );
};

export default Feed;
