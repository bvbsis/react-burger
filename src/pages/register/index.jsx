import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REGISTER_FAILED, REGISTER_SUCCESS } from "../../services/actions/user";
import { ApiUrl, checkResponse } from "../../services/api";
import styles from "./register.module.css";

const RegistrationPage = () => {
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onButtonClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(ApiUrl("auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await checkResponse(res);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      console.log(data);
      navigate('/')
    } catch (err) {
      dispatch({
        type: REGISTER_FAILED,
        payload: err,
      });
      console.log(err);
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
          Регистрация
        </h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          name={"email"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
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
