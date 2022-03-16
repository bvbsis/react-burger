import React from "react";
import detailsStyles from "./ingredient-details.module.css";

const IngredientDetails = React.memo(({ ingredient }) => {
  return (
    <div className={detailsStyles.wrapper}>
      <img
        className={detailsStyles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <span className={`${detailsStyles.heading} text text_type_main-medium`}>
        {ingredient.name}
      </span>
      <ul className={detailsStyles.list}>
        <li className={detailsStyles.list_element}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span className="text text_type_digits-default">
            {ingredient.calories}
          </span>
        </li>
        <li className={detailsStyles.list_element}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">
            {ingredient.proteins}
          </span>
        </li>
        <li className={detailsStyles.list_element}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">
            {ingredient.fat}
          </span>
        </li>
        <li className={detailsStyles.list_element}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
});

export default IngredientDetails;
