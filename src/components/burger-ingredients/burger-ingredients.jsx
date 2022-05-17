import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import CardList from "./card-list/card-list";

import ingredientsStyles from "./burger-ingredients.module.css";

const BurgerIngredients = React.memo(() => {
  const [current, setCurrent] = React.useState("buns");
  const containerRef = React.useRef();
  const bunsRef = React.useRef();
  const sausesRef = React.useRef();
  const fillingsRef = React.useRef();

  const buns = "buns";
  const sauses = "sause";
  const fillings = "fillings";

  const handleTabClick = (type, ref) => {
    setCurrent(type);
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleScroll = (e) => {
    const bunsPosition = bunsRef.current.getBoundingClientRect();
    const sausesPosition = sausesRef.current.getBoundingClientRect();
    const mainPosition = fillingsRef.current.getBoundingClientRect();
    const containerPosition = containerRef.current.getBoundingClientRect();

    if (containerPosition.top - bunsPosition.bottom < 0) {
      setCurrent(buns);
    } else if (containerPosition.top - sausesPosition.bottom < 0) {
      setCurrent(sauses);
    } else if (containerPosition.top - mainPosition.bottom < 0) {
      setCurrent(fillings);
    }
  };

  return (
    <section className={ingredientsStyles.burgerIngredients}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={ingredientsStyles.burgerIngredients__tabs}>
        <Tab
          value={buns}
          active={current === buns}
          onClick={() => handleTabClick(buns, bunsRef)}
        >
          Булки
        </Tab>
        <Tab
          value={sauses}
          active={current === sauses}
          onClick={() => handleTabClick(sauses, sausesRef)}
        >
          Соусы
        </Tab>
        <Tab
          value={fillings}
          active={current === fillings}
          onClick={() => handleTabClick(fillings, fillingsRef)}
        >
          Начинки
        </Tab>
      </div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={ingredientsStyles.burgerIngredients__listWrapper}
      >
        <CardList listRef={bunsRef} heading="Булки" type="bun" />
        <CardList listRef={sausesRef} heading="Соусы" type="sauce" />
        <CardList listRef={fillingsRef} heading="Начинки" type="main" />
      </div>
    </section>
  );
});

export default BurgerIngredients;
