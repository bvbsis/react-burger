import ReactDOM from "react-dom";
import Styles from "./spinner.module.css";

const Spinner = ({ isLoading }) => {

  return isLoading
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
