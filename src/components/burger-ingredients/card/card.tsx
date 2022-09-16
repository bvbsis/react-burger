import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { TIngredient } from "../../../utils/types/types";

import cardStyles from "./card.module.css";
import { useDrag } from "react-dnd";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../../utils/hook";

interface ICardProps {
  ingredient: TIngredient;
}

const Card: FC<ICardProps> = ({ ingredient }) => {
  const { bun, fillings } = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );
  const location = useLocation();
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

  return (
    <li
      ref={drag}
      style={{ opacity }}
      className={cardStyles.card}
    >
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ backgroundLocation: location }}
        className={cardStyles.card__link}
      >
        <div className={cardStyles.card__imageWrapper}>
          {currentIngredients.length ? (
            currentIngredients.some((ingr) => ingr?._id === ingredient._id) ? (
              <Counter
                count={
                  currentIngredients.filter(
                    (item) => item?._id === ingredient._id
                  ).length
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
      </Link>
    </li>
  );
};

export default Card;
