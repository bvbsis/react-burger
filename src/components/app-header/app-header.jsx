import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import appHeaderStyles from "./app-header.module.css";

function AppHeader() {
  const { name } = useSelector((store) => store.user);
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header__wrapper}>
        <nav className={appHeaderStyles.menu}>
          <ul className={appHeaderStyles.menu__list}>
            <li className={appHeaderStyles.menu__listItem}>
              <NavLink
                to="."
                className={({ isActive }) => {
                  return !isActive
                    ? appHeaderStyles.menu__link
                    : `${appHeaderStyles.menu__link} ${appHeaderStyles.menu__link_active}`;
                }}
              >
                <BurgerIcon type="primary" />
                <span
                  className={`text text_type_main-default pl-2 ${appHeaderStyles.menu__linkName}`}
                >
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li className={appHeaderStyles.menu__listItem}>
              <NavLink
                to="feed"
                className={({ isActive }) => {
                  return !isActive
                    ? appHeaderStyles.menu__link
                    : `${appHeaderStyles.menu__link} ${appHeaderStyles.menu__link_active}`;
                }}
              >
                <ListIcon type="secondary" />
                <span
                  className={`${appHeaderStyles.menu__linkName} pl-2 text text_type_main-default`}
                >
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.header__logo}>
          <Logo />
        </div>
        <nav className={appHeaderStyles.menu}>
          <NavLink
            to="profile"
            className={({ isActive }) => {
              return !isActive
                ? appHeaderStyles.menu__link
                : `${appHeaderStyles.menu__link} ${appHeaderStyles.menu__link_active}`;
            }}
          >
            <ProfileIcon type="secondary" />
            <span
              className={`text text_type_main-default pl-2 ${appHeaderStyles.menu__linkName}`}
            >
              {name ? name.toUpperCase() : "Личный кабинет"}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
