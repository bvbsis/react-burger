import propTypes from "prop-types";
import listStyles from "./card-list.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function CardList({ array, type, heading }) {
  const arr = array.filter((ingredient) => ingredient.type === type);

  return (
    <div>
      <h2 className="text text_type_main-medium mt-10">{heading}</h2>
      <ul className={listStyles.list}>
        {arr.map((ingredient) => {
          return (
            <li className={listStyles.card}>
              <div className={listStyles.imageWrapper}>
                <Counter count={1} size="default" />
                <img
                  className={listStyles.image}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
              </div>
              <div style={{ display: "flex", margin: "auto" }}>
                <p className="text text_type_digits-default mr-2">
                  {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={`${listStyles.ingredientName} text text_type_main-default mt-2`}
              >
                {ingredient.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

CardList.propTypes = {
  array: propTypes.arrayOf(propTypes.object),
  type: propTypes.string,
  heading: propTypes.string,
};

export default CardList;
