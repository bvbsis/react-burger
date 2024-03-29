import { useEffect } from "react";
import FeedDetails from "../../components/feed-details/feed-details";
import Feed from "../../components/feed/feed";
import { wsClose, wsStartConnection } from "../../services/redux/actions/ws";
import { useDispatch } from "../../utils/hook";
import styles from "./feed-page.module.css";

const WS_URL = "wss://norma.nomoreparties.space/orders/all";

const FeedPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsStartConnection(WS_URL));
    return () => {
      dispatch(wsClose(1000, "работа закончена"));
    };
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
