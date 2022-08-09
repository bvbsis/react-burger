import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeedDetails from "../../components/feed-details/feed-details";
import Feed from "../../components/feed/feed";
import { wsStartConnection } from "../../services/redux/actions/ws";
import styles from "./feed-page.module.css";

const WS_URL = "wss://norma.nomoreparties.space/orders/all";

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsStartConnection(WS_URL));
  }, [dispatch]);

  return (
    <>
      <h2 className={`${styles.heading} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.wrapper}>
        <Feed
          height={"calc(100vh - 210px)"}
          gap="16px"
          width="600px"
          to="/feed/"
        />
        <FeedDetails />
      </div>
    </>
  );
};

export default FeedPage;
