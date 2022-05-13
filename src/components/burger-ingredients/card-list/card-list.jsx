import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Card from "../card/card";

import listStyles from "./card-list.module.css";

const CardList = React.memo(({ listRef, type, heading }) => {
  const ingredients = useSelector((store) => store.ingredients.items);

  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  if (!ingredients.length) {
    return (
      <h1
        style={{ fontFamily: "sans-serif", margin: "auto", padding: "100px" }}
      >
        Loading...
      </h1>
    );
  }

  return filteredIngredients.length ? (
    <div ref={listRef}>
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
  listRef: PropTypes.object,
};

export default CardList;
