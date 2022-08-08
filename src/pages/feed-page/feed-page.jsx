import FeedDetails from "../../components/feed-details/feed-details";
import Feed from "../../components/feed/feed";
import styles from "./feed-page.module.css";

const FeedPage = () => {
  return (
    <div className={styles.wrapper}>
      <Feed height={"calc(100vh - 210px)"} />
      <FeedDetails />
    </div>
  );
};

export default FeedPage;
