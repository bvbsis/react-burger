import React from "react";
import PropTypes from "prop-types";
import objectTypes from "../../utils/constants";
import cardStyles from "./card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({
  ingredient,
  currentIngredientsId,
  setCurrentIngredientsId,
}) => {
  const onCardClick = (e) => {
    const newCurrentIngredients = [...currentIngredientsId];
    if (currentIngredientsId.indexOf(ingredient._id) !== -1) {
      const index = currentIngredientsId.indexOf(ingredient._id);
      newCurrentIngredients.splice(index, 1);
      setCurrentIngredientsId([...newCurrentIngredients]);
    } else {
      newCurrentIngredients.push(ingredient._id);
      setCurrentIngredientsId([...newCurrentIngredients]);
    }
  };

  return (
    <li onClick={onCardClick} className={cardStyles.card}>
      <div className={cardStyles.image_wrapper}>
        {currentIngredientsId.includes(ingredient._id) ? (
          <Counter count={1} size="default" />
        ) : (
          <></>
        )}
        <img
          className={cardStyles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
      </div>
      <div style={{ display: "flex", margin: "auto" }}>
        <span className="text text_type_digits-default mr-2">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span
        className={`${cardStyles.ingredient_name} text text_type_main-default mt-2`}
      >
        {ingredient.name}
      </span>
    </li>
  );
};

Card.propTypes = {
  ingredient: PropTypes.shape({ ...objectTypes }),
};

export default Card;
