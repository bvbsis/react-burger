import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import CardList from "../card-list/card-list";
import ingredientTypes from "../../utils/constants";

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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ...ingredientTypes,
    })
  ),
  currentIngredientsId: PropTypes.arrayOf(PropTypes.string),
  modalState: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    ingredient: PropTypes.object.isRequired,
    heading: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]),
    order: PropTypes.shape({ identificator: PropTypes.string.isRequired }),
    currentModal: PropTypes.string,
  }),
  setModalState: PropTypes.func.isRequired,
};

export default BurgerIngredients;
