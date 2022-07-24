import ReactDOM from "react-dom";
import Styles from "./error-indicator.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UNSET_ERROR } from "../../services/actions/user";
import { useEffect } from "react";

const ErrorIndicator = () => {
  const dispatch = useDispatch();
  const { isError, error } = useSelector((store) => store.user);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch({
          type: UNSET_ERROR,
        });
      }, 4000);
    }
  }, [dispatch, isError]);

  return isError
    ? ReactDOM.createPortal(
        <div className={Styles.wrapper}>
          <span className={Styles.text}>{`Ошибка: ${
            error === "email or password are incorrect"
              ? "Неверная почта или пароль"
              : error === "Email, password and name are required fields"
              ? "Все поля должны быть заполнены"
              : error === "User already exists"
              ? "Пользователь уже зарегестрирован"
              : error
          }`}</span>
        </div>,
        document.getElementById("error")
      )
    : null;
};

export default ErrorIndicator;
