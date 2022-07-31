import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Styles from "./spinner.module.css";

const Spinner = (props) => {
  const isUserDataLoading = useSelector((store) => store.user.isLoading);
  const isIngredientsDataloading = useSelector(
    (store) => store.ingredients.isLoading
  );
  const isOrderDataloading = useSelector(
    (store) => store.burgerConstructor.isLoading
  );

  return isUserDataLoading || isIngredientsDataloading || isOrderDataloading
    ? ReactDOM.createPortal(
        <div className={Styles.wrapper}>
          <div className={Styles.container}>
            <svg viewBox="0 0 100 100">
              <circle className={Styles.spinner} cx="50" cy="50" r="45" />
            </svg>
          </div>
        </div>,
        document.getElementById("spinner")
      )
    : null;
};

export default Spinner;
