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
                <p
                  className={`text text_type_main-default pl-2 ${appHeaderStyles.linkName}`}
                >
                  Конструктор
                </p>
              </a>
            </li>
            <li className={appHeaderStyles.listItem}>
              <a href="/" className={appHeaderStyles.link}>
                <ListIcon type="secondary" />
                <p
                  className={`${appHeaderStyles.linkName} pl-2 text text_type_main-default`}
                >
                  Лента заказов
                </p>
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
            <p
              className={`text text_type_main-default pl-2 ${appHeaderStyles.linkName}`}
            >
              Личный кабинет
            </p>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
