import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
} from "../../services/actions/user";
import { ApiUrl, checkResponse } from "../../services/api";
import styles from "./forgot-password.module.css";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  const onButtonClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    try {
      const res = await fetch(ApiUrl("password-reset"), {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await checkResponse(res);
      dispatch({ type: PASSWORD_RESET_SUCCESS });
      console.log(data.message);
      navigate("/reset-password");
    } catch (err) {
      console.error(err);
      dispatch({
        type: PASSWORD_RESET_FAILED,
        payload: err,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button onClick={onButtonClick} type="primary" size="medium">
          Восстановить
        </Button>
        <div style={{ marginTop: 80, marginBottom: 16 }}>
          <span className="text text_type_main-default mr-2">
            Вспомнили пароль?
          </span>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            type="secondary"
            size="medium"
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
    
  );
};

export const ResetPasswordPage = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <Input
          type={"text"}
          placeholder={"Новый пароль"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
        <div style={{ marginTop: 80, marginBottom: 16 }}>
          <span className="text text_type_main-default mr-2">
            Вспомнили пароль?
          </span>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            type="secondary"
            size="medium"
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};
