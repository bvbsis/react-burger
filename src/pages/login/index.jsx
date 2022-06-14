import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../services/actions/user";
import { ApiUrl, checkResponse } from "../../services/api";
import styles from "./login.module.css";

const LoginPage = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onButtonClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const res = await fetch(ApiUrl("auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await checkResponse(res);
      console.log(data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAILED,
        payload: err,
      });
    }
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Вход</h2>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          name={"email"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          name={"password"}
          error={false}
          icon={"ShowIcon"}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button onClick={onButtonClick} type="primary" size="medium">
          Войти
        </Button>
        <div style={{ marginTop: 80, marginBottom: 16 }}>
          <span className="text text_type_main-default mr-2">
            Вы — новый пользователь?
          </span>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            type="secondary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>
        <div>
          <span className="text text_type_main-default mr-2">
            Забыли пароль?
          </span>
          <Button
            onClick={() => {
              navigate("/forgot-password");
            }}
            type="secondary"
            size="medium"
          >
            Восстановить пароль
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
