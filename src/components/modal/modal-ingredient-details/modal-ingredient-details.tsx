import React, { useMemo } from "react";

import detailsStyles from "./modal-ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../../utils/hook";

const ModalIngredientDetails: React.FC = React.memo(() => {
  const { items } = useSelector((store) => store.ingredients);
  let { id } = useParams();

  const currentIngredient = useMemo(() => {
    return items.find((item) => item._id === id);
  }, [items, id]);

  return (
    <div className={detailsStyles.ingredientDetails}>
      <span
        className={`${detailsStyles.ingredientDetails__heading} text text_type_main-large`}
      >
        Детали ингредиента
      </span>
      <img
        className={detailsStyles.ingredientDetails__image}
        src={currentIngredient?.image_large}
        alt={currentIngredient?.name}
      />
      <span
        className={`${detailsStyles.ingredientDetails__text} text text_type_main-medium`}
      >
        {currentIngredient?.name}
      </span>
      <ul className={detailsStyles.ingredientDetails__list}>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Калории, ккал</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.calories}
          </span>
        </li>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.proteins}
          </span>
        </li>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.fat}
          </span>
        </li>
        <li className={detailsStyles.ingredientDetails__listElement}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
});

export default ModalIngredientDetails;
