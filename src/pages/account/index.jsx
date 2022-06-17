import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import styles from "./account.module.css";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../services/useAuth";
import {
  GET_USER_DATA_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  LOG_OUT_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SET_USER_DATA_FAILED,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
} from "../../services/actions/user";

export const AccountPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logUserOut = async () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    try {
      await auth.logOut();
      navigate("/");
      dispatch({
        type: LOG_OUT_SUCCESS,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOG_OUT_FAILED,
        payload: err,
      });
    }
  };

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
        <button
          onClick={logUserOut}
          className={`${styles.button} text text_type_main-medium`}
        >
          Выход
        </button>
        <span className={`${styles.hint} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export const Orders = () => {
  return <h1>Orders</h1>;
};

export const Profile = () => {
  const { name, email } = useSelector((store) => store.user);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useAuth();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = async () => {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    try {
      const data = await auth.setUser(form);
      dispatch({
        type: SET_USER_DATA_SUCCESS,
        payload: data.user,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_USER_DATA_FAILED,
        payload: err,
      });
    }
  };

  useEffect(() => {
    setForm({ ...form, name, email });
  }, [email, name]);

  useEffect(() => {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    async function getUserData() {
      try {
        const data = await auth.getUser();
        if (data?.success) {
          const { name, email } = data.user;
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            payload: { name, email },
          });
        }
      } catch (err) {
        dispatch({
          type: GET_USER_DATA_FAILED,
          payload: err,
        });
        console.log(err);
      }
    }
    getUserData();
  }, []);

  return (
    <form className={styles.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={form.name}
        name={"name"}
        error={false}
        icon={"EditIcon"}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"text"}
        placeholder={"Логин"}
        onChange={onChange}
        value={form.email}
        name={"email"}
        error={false}
        icon={"EditIcon"}
        onIconClick={onIconClick}
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
        icon={"EditIcon"}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
    </form>
  );
};
