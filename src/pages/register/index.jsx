import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REGISTER_FAILED, REGISTER_SUCCESS } from "../../services/actions/user";
import useAuth from "../../services/useAuth";
import styles from "./register.module.css";

const RegistrationPage = () => {
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const inputRef = React.useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    try {
      await auth.register(form);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      navigate("/login");
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
          type={"password"}
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
