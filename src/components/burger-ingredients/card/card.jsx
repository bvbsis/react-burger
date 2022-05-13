import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientTypes from "../../../utils/constants";
import { openIngredientModal } from "../../../services/actions/modal";

import cardStyles from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";

const Card = ({ ingredient }) => {
  const { bun, fillings } = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "INGREDIENT_NEW",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const currentIngredients = useMemo(() => {
    return [...fillings, bun];
  }, [fillings, bun]);

  const opacity = isDragging ? 0.4 : 1;

  const onCardClick = () => {
    dispatch(openIngredientModal(ingredient, "Детали ингредиента"));
  };

  return (
    <li
      ref={drag}
      style={{ opacity }}
      onClick={onCardClick}
      className={cardStyles.card}
    >
      <div className={cardStyles.card__imageWrapper}>
        {currentIngredients.length ? (
          currentIngredients.some((ingr) => ingr._id === ingredient._id) ? (
            <Counter
              count={
                currentIngredients.filter((item) => item._id === ingredient._id)
                  .length
              }
              size="default"
            />
          ) : null
        ) : null}
        <img
          className={cardStyles.card__image}
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
        className={`${cardStyles.card__ingredientName} text text_type_main-default mt-2`}
      >
        {ingredient.name}
      </span>
    </li>
  );
};

Card.propTypes = {
  ingredient: PropTypes.shape(ingredientTypes),
};

export default Card;
