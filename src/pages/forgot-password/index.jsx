import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./forgot-password.module.css";

export const ForgotPasswordPage = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Восстановление пароля</h2>
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
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
          Восстановить
        </Button>
        <div style={{ marginTop: 80, marginBottom: 16 }}>
          <span className="text text_type_main-default mr-2">
            Вспомнили пароль?
          </span>
          <Button type="secondary" size="medium">
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
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Восстановление пароля</h2>
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
          <Button type="secondary" size="medium">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};