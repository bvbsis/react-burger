import appHeaderStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.content}>
        <nav className={appHeaderStyles.nav}>
          <ul className={appHeaderStyles.list}>
            <li className={appHeaderStyles.listItem}>
              <a href="/" className={appHeaderStyles.link}>
                <BurgerIcon type="primary" />
                <span
                  className={`text text_type_main-default pl-2 ${appHeaderStyles.linkName}`}
                >
                  Конструктор
                </span>
              </a>
            </li>
            <li className={appHeaderStyles.listItem}>
              <a href="/" className={appHeaderStyles.link}>
                <ListIcon type="secondary" />
                <span
                  className={`${appHeaderStyles.linkName} pl-2 text text_type_main-default`}
                >
                  Лента заказов
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <nav className={appHeaderStyles.nav}>
          <a href="/" className={appHeaderStyles.link}>
            <ProfileIcon type="secondary" />
            <span
              className={`text text_type_main-default pl-2 ${appHeaderStyles.linkName}`}
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
