import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./account.module.css";
import { logUserOut, setUserData } from "../../services/redux/actions/user";
import Feed from "../../components/feed/feed";
import { wsClose, wsStartConnection } from "../../services/redux/actions/ws";
import { getCookie } from "../../services/api";
import { useDispatch, useSelector } from "../../utils/hook";
import { ChangeEvent } from "react";
import { Obj } from "reselect/es/types";

export const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    dispatch(logUserOut(navigate));
  }, [dispatch, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.link_active} ${styles.link} text text_type_main-medium`
              : `${styles.link} text text_type_main-medium`
          }
          to="."
          end
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
          onClick={handleClick}
          className={`${styles.button} text text_type_main-medium`}
        >
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

export const Profile = () => {
  const [disabledInputs, setDisabledInputs] = useState<
    Obj<{ isDisabled: boolean; icon: "CloseIcon" | "EditIcon" }>
  >({
    name: { isDisabled: true, icon: "EditIcon" },
    email: { isDisabled: true, icon: "EditIcon" },
    password: { isDisabled: true, icon: "EditIcon" },
  });
  const { name, email } = useSelector((store) => store.user);
  const [form, setForm] = React.useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const areButtonsActive = useMemo(() => {
    let isActive = false;
    for (let input in disabledInputs) {
      if (!disabledInputs[input].isDisabled) {
        isActive = true;
      }
    }
    return isActive;
  }, [disabledInputs]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setUserData(setDisabledInputs, disabledInputs, setForm, form));
    },
    [disabledInputs, dispatch, form]
  );

  const handleCancel = useCallback(
    (e) => {
      e.preventDefault();
      setDisabledInputs({
        ...disabledInputs,
        name: { isDisabled: true, icon: "EditIcon" },
        email: { isDisabled: true, icon: "EditIcon" },
        password: { isDisabled: true, icon: "EditIcon" },
      });
      setForm({
        ...form,
        name: name as string,
        email: email as string,
        password: "",
      });
    },
    [disabledInputs, email, form, name]
  );

  const nameInputRef = React.useRef(null);
  const loginInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);

  const onIconClick = useCallback(
    (ref) => {
      let icon;
      if (ref.current.disabled) {
        icon = "CloseIcon";
      } else {
        icon = "EditIcon";
        setForm({
          ...form,
          [ref.current.name]:
            ref.current.name === "name"
              ? name
              : ref.current.name === "email"
              ? email
              : "",
        });
      }

      setDisabledInputs({
        ...disabledInputs,
        [ref.current.name]: { isDisabled: !ref.current.disabled, icon: icon },
      });
      if (disabledInputs[ref.current.name]) {
        setTimeout(() => ref.current.focus(), 0);
      }
    },
    [disabledInputs, email, form, name]
  );

  useEffect(() => {
    setForm({ ...form, name: name as string, email: email as string });
  }, [email, form, name]);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        disabled={disabledInputs.name.isDisabled}
        value={form.name}
        onIconClick={() => onIconClick(nameInputRef)}
        ref={nameInputRef}
        name={"name"}
        error={false}
        icon={disabledInputs.name.icon}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"text"}
        placeholder={"Логин"}
        onChange={onChange}
        disabled={disabledInputs.email.isDisabled}
        value={form.email}
        onIconClick={() => onIconClick(loginInputRef)}
        ref={loginInputRef}
        name={"email"}
        error={false}
        icon={disabledInputs.email.icon}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Новый пароль"}
        onChange={onChange}
        value={form.password}
        disabled={disabledInputs.password.isDisabled}
        onIconClick={() => onIconClick(passwordInputRef)}
        ref={passwordInputRef}
        name={"password"}
        error={false}
        icon={disabledInputs.password.icon}
        errorText={"Ошибка"}
        size={"default"}
      />
      <div
        style={areButtonsActive ? { display: "block" } : { display: "none" }}
      >
        <div className={styles.buttonContainer}>
          <Button
            htmlType="button"
            onClick={handleCancel}
            type="secondary"
            size="medium"
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
};

export const Orders = () => {
  const dispatch = useDispatch();

  const wsUrl = useMemo(
    () =>
      `wss://norma.nomoreparties.space/orders?token=${getCookie(
        "accessToken"
      )}`,
    []
  );

  useEffect(() => {
    dispatch(wsStartConnection(wsUrl));
    return () => {
      dispatch(wsClose(1000, "работа закончена"));
    };
  }, [dispatch, wsUrl]);

  return (
    <div className={styles.ordersWrapper}>
      <Feed
        height="calc(100vh - 150px)"
        elementHeight="246px"
        gap="24px"
        reverse={true}
        withStatus={true}
        to="/profile/orders/"
      />
    </div>
  );
};
