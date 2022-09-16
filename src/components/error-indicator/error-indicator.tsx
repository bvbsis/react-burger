import ReactDOM from "react-dom";
import Styles from "./error-indicator.module.css";
import { FC, useEffect } from "react";

interface IErrorIndicatorProps {
  isError: boolean;
  error: string | null;
  unsetError: () => void;
}

const ErrorIndicator: FC<IErrorIndicatorProps> = ({
  isError,
  error,
  unsetError,
}) => {
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        unsetError();
      }, 4000);
    }
  }, [isError, unsetError]);

  const container = document.getElementById("error");

  return isError && container
    ? ReactDOM.createPortal(
        <div className={Styles.wrapper}>
          <span className={Styles.text}>
            {error === "email or password are incorrect"
              ? "Неверная почта или пароль"
              : error === "Email, password and name are required fields"
              ? "Все поля должны быть заполнены"
              : error === "User already exists"
              ? "Пользователь уже зарегестрирован"
              : error === "Incorrect reset token"
              ? "Неверный код из почты"
              : error === "jwt expired" || error === "You should be authorised"
              ? "Для совершения заказа нужно авторизоваться"
              : error}
          </span>
        </div>,
        container
      )
    : null;
};

export default ErrorIndicator;
