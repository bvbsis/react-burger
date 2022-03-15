import React from "react";
import PropTypes from "prop-types";
import objectTypes from "../../utils/constants";
import listStyles from "./card-list.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const CardList = React.memo(({ array, type, heading }) => {
  const arr = array.filter((ingredient) => ingredient.type === type);

  return arr.length ? (
    <div>
      <h2 className="text text_type_main-medium mt-10">{heading}</h2>
      <ul className={listStyles.list}>
        {arr.map((ingredient) => {
          return (
            <li key={ingredient._id} className={listStyles.card}>
              <div className={listStyles.image_wrapper}>
                <Counter count={1} size="default" />
                <img
                  className={listStyles.image}
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
                className={`${listStyles.ingredient_name} text text_type_main-default mt-2`}
              >
                {ingredient.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
});

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
