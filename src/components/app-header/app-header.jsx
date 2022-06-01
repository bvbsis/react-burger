import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header__wrapper}>
        <nav className={appHeaderStyles.menu}>
          <ul className={appHeaderStyles.menu__list}>
            <li className={appHeaderStyles.menu__listItem}>
              <a href="/" className={appHeaderStyles.menu__link}>
                <BurgerIcon type="primary" />
                <span
                  className={`text text_type_main-default pl-2 ${appHeaderStyles.menu__linkName}`}
                >
                  Конструктор
                </span>
              </a>
            </li>
            <li className={appHeaderStyles.menu__listItem}>
              <a href="/" className={appHeaderStyles.menu__link}>
                <ListIcon type="secondary" />
                <span
                  className={`${appHeaderStyles.menu__linkName} pl-2 text text_type_main-default`}
                >
                  Лента заказов
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.header__logo}>
          <Logo />
        </div>
        <nav className={appHeaderStyles.menu}>
          <a href="/profile" className={appHeaderStyles.menu__link}>
            <ProfileIcon type="secondary" />
            <span
              className={`text text_type_main-default pl-2 ${appHeaderStyles.menu__linkName}`}
            >
              Личный кабинет
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
