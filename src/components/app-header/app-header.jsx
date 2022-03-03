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
            <li>
              <a
                href="/"
                className={`text text_type_main-default ${appHeaderStyles.link} pt-4 pr-5 pb-4 ml-5 mt-4 mb-4 mr-2`}
              >
                <BurgerIcon type="primary" />
                <p style={{ margin: 0 }} className="pl-2">
                  Конструктор
                </p>
              </a>
            </li>
            <li>
              <a
                href="/"
                className={`text text_type_main-default ${appHeaderStyles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 mr-2`}
              >
                <ListIcon type="secondary" />
                <p style={{ margin: 0 }} className="pl-2">
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
          <a
            href="/"
            className={`text text_type_main-default ${appHeaderStyles.link} pt-4 pb-4 pl-5 mr-5 mt-4 mb-4`}
          >
            <ProfileIcon type="secondary" />
            <p style={{ margin: 0 }} className="pl-2">
              Личный кабинет
            </p>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
