import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import {
  changeElementPosition,
  deleteElementFromConstructor,
} from "../../../services/actions/burger-constructor";
import ConstructorFillingIngredientStyles from "./constructor-filling-ingredient.module.css";
import ingredientTypes from "../../../utils/constants";

const ConstructorFillingIngredient = memo(({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const { fillings } = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: "CURRENT_INGREDIENT",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CURRENT_INGREDIENT",
    hover(item, monitor) {
      const dragIndex = item.index;
      const dropIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      const newFillings = [...fillings];
      const dragItem = newFillings[dragIndex];
      const dropItem = newFillings[dropIndex];

      if (dragIndex < dropIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > dropIndex && hoverActualY > hoverMiddleY) return;
      newFillings[dragIndex] = dropItem;
      newFillings[dropIndex] = dragItem;
      dispatch(changeElementPosition(newFillings));
      item.index = dropIndex;
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  });

  const dragDropRef = dragRef(dropRef(ref));

  const opacityDrag = isDragging ? 0.6 : 1;

  return (
    <div style={{ opacity: opacityDrag }} ref={dragDropRef}>
      <div
        style={{ opacity: opacityDrag }}
        key={ingredient.uuid}
        className={
          ConstructorFillingIngredientStyles.burgerConstructor__elWrapper
        }
      >
        <div
          className={
            ConstructorFillingIngredientStyles.burgerConstructor__dragger
          }
        />
        <ConstructorElement
          type="center"
          isLocked={false}
          text={ingredient.name}
          handleClose={() =>
            dispatch(deleteElementFromConstructor(ingredient.uuid))
          }
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
        />
      </div>
    </div>
  );
});

ConstructorFillingIngredient.propTypes = {
  ingredient: PropTypes.shape(ingredientTypes),
  index: PropTypes.number.isRequired,
};

export default ConstructorFillingIngredient;
