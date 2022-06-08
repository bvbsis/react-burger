import { useSelector } from "react-redux";
import Styles from "./spinner.module.css";

const Spinner = () => {
  const isUserDataloading = useSelector((store) => store.user.isLoading);
  const isIngredientsDataloading = useSelector(
    (store) => store.ingredients.isLoading
  );
  const isModalDataloading = useSelector((store) => store.modal.isLoading);

  return isUserDataloading || isIngredientsDataloading || isModalDataloading ? (
    <div className={Styles.wrapper}>
      <div className={Styles.container}>
        <svg viewBox="0 0 100 100">
          <circle className={Styles.spinner} cx="50" cy="50" r="45" />
        </svg>
      </div>
    </div>
  ) : null;
};

export default Spinner;
