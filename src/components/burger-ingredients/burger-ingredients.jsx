import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

function BurgerTab() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className='mt-5' style={{ display: "flex" }}>
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
    <div className="pl-5">
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      {BurgerTab()}
      <div>
        
      </div>
    </div>
  );
}

export default BurgerIngredients;
