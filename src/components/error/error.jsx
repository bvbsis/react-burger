import ReactDOM from "react-dom";
import Styles from "./error.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UNSET_ERROR } from "../../services/actions/user";
import { useEffect } from "react";

const Err = () => {
  const dispatch = useDispatch();
  const isUserError = useSelector((store) => store.user.isError);

  useEffect(() => {
    if (isUserError) {
      setTimeout(() => {
        dispatch({
          type: UNSET_ERROR,
        });
      }, 4000);
    }
  }, [dispatch, isUserError]);

  return isUserError
    ? ReactDOM.createPortal(
        <div className={Styles.wrapper}>
          <span className={Styles.text}>Произошла ошибка...</span>
        </div>,
        document.getElementById("error")
      )
    : null;
};

export default Err;
