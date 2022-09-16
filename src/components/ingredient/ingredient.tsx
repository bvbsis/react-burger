import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../utils/hook";
import ingredientStyles from "./ingredient.module.css";


const Ingredient: FC = () => {
  const { items } = useSelector((store) => store.ingredients);
  let { id } = useParams();

  const currentIngredient = useMemo(() => {
    return items.find((item) => item._id === id);
  }, [items, id]);

  return (
    <div className={ingredientStyles.ingredient}>
      <span
        className={`${ingredientStyles.ingredient__heading} text text_type_main-large`}
      >
        Детали ингредиента
      </span>
      <img
        className={ingredientStyles.ingredient__image}
        src={currentIngredient?.image_large}
        alt={currentIngredient?.name}
      />
      <span
        className={`${ingredientStyles.ingredient__text} text text_type_main-medium`}
      >
        {currentIngredient?.name}
      </span>
      <ul className={ingredientStyles.ingredient__list}>
        <li className={ingredientStyles.ingredient__listElement}>
          <span className="text text_type_main-default">Калории, ккал</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.calories}
          </span>
        </li>
        <li className={ingredientStyles.ingredient__listElement}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.proteins}
          </span>
        </li>
        <li className={ingredientStyles.ingredient__listElement}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.fat}
          </span>
        </li>
        <li className={ingredientStyles.ingredient__listElement}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient?.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Ingredient;
