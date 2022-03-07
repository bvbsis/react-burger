import propTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import cardStyles from "./card.module.css";

function Card({ ingredient }) {
  return (
    <li className={cardStyles.card}>
      <div className={cardStyles.imageWrapper}>
        <Counter count={1} size="default" />
        <img
          className={cardStyles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
      </div>
      <div style={{ display: "flex", margin: "auto" }}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${cardStyles.ingredientName} text text_type_main-default mt-2`}
      >
        {ingredient.name}
      </p>
    </li>
  );
}

Card.propTypes = {
  ingredient: propTypes.object,
}

export default Card;
