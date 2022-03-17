import React from "react";
import PropTypes from "prop-types";
import detailsStyles from "./ingredient-details.module.css";
import objectTypes from "../../utils/constants";

const IngredientDetails = React.memo(({ ingredient }) => {
  return (
    <div className={detailsStyles.ingredientDetails}>
      <img
        className={detailsStyles.ingredientDetails__image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <span className={`${detailsStyles.ingredientDetails__heading} text text_type_main-medium`}>
        {ingredient.name}
      </span>
      <ul className={detailsStyles.ingredientDetails__list}>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span className="text text_type_digits-default">
            {ingredient.calories}
          </span>
        </li>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">
            {ingredient.proteins}
          </span>
        </li>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">
            {ingredient.fat}
          </span>
        </li>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
});

React.propTypes = {
  ingredient: PropTypes.shape({...objectTypes})
}

export default IngredientDetails;
