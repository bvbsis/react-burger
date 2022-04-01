import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import CardList from "../card-list/card-list";

import ingredientsStyles from "./burger-ingredients.module.css";

const BurgerIngredients = React.memo(() => {
  const [current, setCurrent] = React.useState("buns");
  const buns = "buns";
  const sauses = "sauses";
  const fillings = "fillings";

  return (
    <section className={ingredientsStyles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={ingredientsStyles.burgerIngredients__tabs}>
        <Tab value={buns} active={current === buns} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value={sauses} active={current === sauses} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value={fillings}
          active={current === fillings}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={ingredientsStyles.burgerIngredients__listWrapper}>
        <CardList heading="Булки" type="bun" />
        <CardList heading="Соусы" type="sauce" />
        <CardList heading="Начинки" type="main" />
      </div>
    </section>
  );
});

export default BurgerIngredients;
