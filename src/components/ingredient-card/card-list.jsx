import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import listStyles from "./card-list.module.css";

function CardList(props) {
  return (
    <div>
      <h2 className={` ${listStyles.heading} text text_type_main-medium mt-10`}>{props.heading}</h2>
      <ul className={listStyles.list}>
        {props.array.map((ingredient) => {
          return (
            <li key={ingredient._id} className={listStyles.list_element}>
              <div className={listStyles.imageWrapper}>
                <Counter count={1} size="default" />
                <img
                  className={listStyles.image}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
              </div>
              <div style={{ display: "flex", margin: "auto" }}>
                <p className="text text_type_digits-default mr-2">
                  {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={`${listStyles.ingredientName} text text_type_main-default mt-2`}
                key={ingredient._id}
              >
                {ingredient.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CardList;
