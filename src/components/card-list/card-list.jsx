import React from "react";
import PropTypes from "prop-types";
import objectTypes from "../../utils/constants";
import listStyles from "./card-list.module.css";
import Card from "../card/card";

const CardList = React.memo(
  ({ array, type, heading, currentIngredientsId, setCurrentIngredientsId }) => {
    const arr = array.filter((ingredient) => ingredient.type === type);

    return arr.length ? (
      <div>
        <h2 className="text text_type_main-medium mt-10">{heading}</h2>
        <ul className={listStyles.list}>
          {arr.map((ingredient) => (
            <Card currentIngredientsId={currentIngredientsId} setCurrentIngredientsId={setCurrentIngredientsId}  key={ingredient._id} ingredient={ingredient} />
          ))}
        </ul>
      </div>
    ) : (
      <></>
    );
  }
);

CardList.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      ...objectTypes,
    })
  ),
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default CardList;
