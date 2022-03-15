import React from "react";
import objectTypes from "../../utils/constants";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import CardList from "../card-list/card-list";

const BurgerIngredients = React.memo(({ array }) => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={ingredientsStyles.wrapper}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className="mt-5" style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={ingredientsStyles.list_wrapper}>
        <CardList array={array} heading="Булки" type="bun" />
        <CardList array={array} heading="Соусы" type="sauce" />
        <CardList array={array} heading="Начинки" type="main" />
      </div>
    </section>
  );
});

BurgerIngredients.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      ...objectTypes,
    })
  ),
};

export default BurgerIngredients;
