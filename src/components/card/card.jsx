import { useContext } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ingredientTypes from "../../utils/constants";

import cardStyles from "./card.module.css";

import { CurrentIngredientsContext } from "../../utils/ingredients-context";
import { ModalContext } from "../../utils/modal-context";

const Card = ({ ingredient }) => {
  const { currentIngredients } = useContext(CurrentIngredientsContext);
  const { modalState, setModalState } = useContext(ModalContext);

  const onCardClick = () => {
    setModalState({
      ...modalState,
      ingredient,
      heading: "Детали ингредиента",
      isOpen: true,
      currentModal: "ingredient-details",
    });
  };

  return (
    <li onClick={onCardClick} className={cardStyles.card}>
      <div className={cardStyles.card__imageWrapper}>
        {currentIngredients.includes(ingredient._id) ? (
          <Counter count={1} size="default" />
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
  ingredient: PropTypes.shape({ ...ingredientTypes }),
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

export default Card;
