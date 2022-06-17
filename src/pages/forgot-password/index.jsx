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
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILED,
} from "../../services/actions/user";
import { checkResponse } from "../../services/api";
import useAuth from "../../services/useAuth";
import styles from "./forgot-password.module.css";

export const SendPasswordResetEmailPage = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const auth = useAuth();
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    try {
      const res = await auth.sendPasswordResetEmail(email);
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
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={onChange}
          value={email}
          name={"email"}
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

export const ConfirmPasswordResetPage = () => {
  const [form, setForm] = React.useState({ password: "", token: "" });
  const inputRef = React.useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: PASSWORD_CHANGE_REQUEST,
    });
    try {
      const res = await auth.confirmPasswordReset(form);
      console.log(res);
      const data = await checkResponse(res);
      console.log(data);
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
      });
      console.log(data.message);
      navigate("/login");
    } catch (err) {
      dispatch({
        type: PASSWORD_CHANGE_FAILED,
        payload: err,
      });
      console.error(err);
    }
  };
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
          type={"password"}
          placeholder={"Новый пароль"}
          onChange={onChange}
          value={form.password}
          name={"password"}
          error={false}
          icon={"ShowIcon"}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.token}
          name={"token"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button onClick={onButtonClick} type="primary" size="medium">
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
