import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import ingredientsStyles from "./burger-ingredients.module.css";
import CardList from "../ingredient-card/card-list";

const buns = data.filter((ingredient) => ingredient.type === "bun");
const fillings = data.filter((ingredient) => ingredient.type === "main");
const sauces = data.filter((ingredient) => ingredient.type === "sauce");

function BurgerTab() {
  const [current, setCurrent] = React.useState("one");
  return (
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
  );
}

function BurgerIngredients() {
  return (
    <section className={ingredientsStyles.wrapper}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <BurgerTab />
      <div>
        <CardList heading="Булки" array={buns} />
        <CardList heading="Соусы" array={sauces} />
        <CardList heading="Начинки" array={fillings} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
