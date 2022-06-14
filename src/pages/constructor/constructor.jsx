import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Styles from "./constructor.module.css";

const ConstructorPage = () => {
  return (
    <div className={Styles.wrapper}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};

export default ConstructorPage;
