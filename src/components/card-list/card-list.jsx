import React from "react";
import propTypes from "prop-types";
import listStyles from "./card-list.module.css";
import Card from "../card/card";

function CardList({array, type, heading}) {
  const arr = array.filter((ingredient) => ingredient.type === type);

  return (
    <div>
      <h2 className="text text_type_main-medium mt-10">{heading}</h2>
      <ul className={listStyles.list}>
        {arr.map((ingredient) => {
          return (
            <Card key={ingredient._id} ingredient = {ingredient} />
          );
        })}
      </ul>
    </div>
  );
}

CardList.propTypes = {
  array: propTypes.arrayOf(propTypes.object),
  type: propTypes.string,
  heading: propTypes.string
}

export default CardList;
