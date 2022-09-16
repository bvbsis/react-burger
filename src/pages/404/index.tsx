import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./404.module.css";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={Styles.wrapper}>
      <span className={Styles.smallText}>
        О нет! Ошибка
      </span>
      <span className={Styles.largeText}>404</span>
      <span className={Styles.smallText}>
        Страница не найдена
      </span>
      <Button
        onClick={() => {
          navigate("/");
        }}
        type="secondary"
        size="medium"
      >
        Перейти на главную
      </Button>
    </div>
  );
};
export default NotFoundPage;
