import React, { useContext } from "react";
import PropTypes from "prop-types";

import Card from "../card/card";

import listStyles from "./card-list.module.css";

import { InitialIngredientsContext } from "../../utils/ingredients-context";

const CardList = React.memo(({ type, heading }) => {
  const { ingredients } = useContext(InitialIngredientsContext);

  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  return filteredIngredients.length ? (
    <div>
      <h2 className="text text_type_main-medium mt-10">{heading}</h2>
      <ul className={listStyles.cardList__list}>
        {filteredIngredients.map((ingredient) => (
          <Card key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </div>
  ) : null;
});

CardList.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default CardList;
