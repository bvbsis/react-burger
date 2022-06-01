import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./profile.module.css";

const ProfilePage = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <NavLink activeClassName={styles.link_active} className={`${styles.link} text text_type_main-medium`} to="/profile">
          Профиль
        </NavLink>
        <NavLink activeClassName={styles.link_active} className={`${styles.link} text text_type_main-medium`} to="/profile/orders">
          История заказов
        </NavLink>
        <button
          className={`${styles.button} text text_type_main-medium`}
          to="/"
        >
          Выйти
        </button>
        <span className={`${styles.hint} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <form className={styles.container}>
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
          placeholder={"Логин"}
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
      </form>
    </div>
  );
};

export default ProfilePage;
