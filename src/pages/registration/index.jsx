import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./registration.module.css";

const RegistrationPage = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.container}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
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
          placeholder={"E-mail"}
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
          placeholder={"Пароль"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
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
          <Button type="secondary" size="medium">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};


export default RegistrationPage;