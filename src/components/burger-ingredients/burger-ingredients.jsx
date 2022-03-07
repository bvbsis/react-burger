import React from "react";
import propTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
import CardList from "../card-list/card-list";

function BurgerIngredients({ array }) {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={ingredientsStyles.wrapper}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
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
      <div className={ingredientsStyles.listWrapper}>
        <CardList array={array} heading="Булки" type="bun" />
        <CardList array={array} heading="Соусы" type="sauce" />
        <CardList array={array} heading="Начинки" type="main" />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  array: propTypes.arrayOf(propTypes.object),
};

export default BurgerIngredients;
