import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
} from "../../services/redux/actions/user";
import { useDispatch } from "../../utils/hook";
import styles from "./register.module.css";

const RegistrationPage = () => {
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUser(form, navigate));
    },
    [dispatch, form, navigate]
  );

  const [inputType, setInputType] = useState("password");

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>
          Регистрация
        </h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={onChange}
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
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div style={{ marginTop: 80, marginBottom: 16 }}>
          <span className="text text_type_main-default mr-2">
            Уже зарегистрированы?
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

export default RegistrationPage;
