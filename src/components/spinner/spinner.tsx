import { FC } from "react";
import ReactDOM from "react-dom";
import Styles from "./spinner.module.css";

interface ISpinnerProps {
  isLoading: boolean;
}

const Spinner: FC<ISpinnerProps> = ({ isLoading }) => {
  const container = document.getElementById("spinner");

  return isLoading && container
    ? ReactDOM.createPortal(
        <div className={Styles.wrapper}>
          <div className={Styles.container}>
            <svg viewBox="0 0 100 100">
              <circle className={Styles.spinner} cx="50" cy="50" r="45" />
            </svg>
          </div>
        </div>,
        container
      )
    : null;
};

export default Spinner;
