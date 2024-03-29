import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../../services/redux/actions/user";
import { useDispatch } from "../../utils/hook";
import styles from "./login.module.css";

const LoginPage = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(logInUser(form));
    },
    [dispatch, form]
  );

  const [inputType, setInputType] = useState("password");

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Вход</h2>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: e.target.value })
          }
          value={form.email}
          name={"email"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={inputType as "password" | "text"}
          placeholder={"Пароль"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value })
          }
          value={form.password}
          name={"password"}
          error={false}
          icon={"ShowIcon"}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium" htmlType={"submit"}>
          Войти
        </Button>
        <div className={styles.buttonsWrapper}>
          <span className="text text_type_main-default mr-2">
            Вы — новый пользователь?
          </span>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            type="secondary"
            size="medium"
            htmlType={"button"}
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
            htmlType={"button"}
          >
            Восстановить пароль
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
