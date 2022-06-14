import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import styles from "./account.module.css";
import { useSelector } from "react-redux";

export const AccountPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.link_active} ${styles.link} text text_type_main-medium`
              : `${styles.link} text text_type_main-medium`
          }
          to="./"
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.link_active} ${styles.link} text text_type_main-medium`
              : `${styles.link} text text_type_main-medium`
          }
          to="./orders"
        >
          История заказов
        </NavLink>
        <button className={`${styles.button} text text_type_main-medium`}>
          Выход
        </button>
        <span className={`${styles.hint} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};

export const Orders = () => {
  return <h1>Orders</h1>;
};

export const Profile = () => {
  const { password, name, email } = useSelector((store) => store.user);
  const [value, setValue] = React.useState({ name, email, password });
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <form className={styles.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValue(e.target.value)}
        value={value.name}
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
        value={value.email}
        name={"login"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={(e) => setValue(e.target.value)}
        value={value.password}
        name={"password"}
        error={false}
        icon={"ShowIcon"}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
    </form>
  );
};
