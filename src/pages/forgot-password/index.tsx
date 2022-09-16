import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  sendResetToken,
  changePasswordWithToken,
} from "../../services/redux/actions/user";
import { useDispatch, useSelector } from "../../utils/hook";
import styles from "./forgot-password.module.css";

export const SendPasswordResetEmailPage = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(sendResetToken(email, navigate));
    },
    [dispatch, email, navigate]
  );

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.container}>
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
        <Button type="primary" size="medium">
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isResetTokenSent } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(changePasswordWithToken(form, navigate));
    },
    [dispatch, form, navigate]
  );

  const [inputType, setInputType] = useState("password");

  const onIconClick = () => {
    setTimeout(() => inputRef?.current?.focus(), 0);
    setInputType(inputType === "password" ? "text" : "password");
  };

  return isResetTokenSent ? (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <Input
          type={inputType as "password" | "text"}
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
  ) : (
    <Navigate to="/forgot-password" />
  );
};
