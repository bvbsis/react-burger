import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeElementPosition,
  deleteElementFromConstructor,
} from "../../services/actions/burger-constructor";
import ConstructorFillingIngredientStyles from "./constructor-filling-ingredient.module.css";

const ConstructorFillingIngredient = memo(({ ingredient, index }) => {
  const dispatch = useDispatch();
  const { currentIngredients } = useSelector(
    (store) => store.burgerConstructor
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

      if (dragIndex < dropIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > dropIndex && hoverActualY > hoverMiddleY) return;
      handleChangeElementPosition(dragIndex, dropIndex);
      item.index = dropIndex;
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  });

  const handleChangeElementPosition = useCallback(
    (dragIndex, dropIndex) => {
      const newCurrentIngredients = [...currentIngredients];
      const dragItem = newCurrentIngredients[dragIndex];
      const dropItem = newCurrentIngredients[dropIndex];
      newCurrentIngredients[dragIndex] = dropItem;
      newCurrentIngredients[dropIndex] = dragItem;
      dispatch(changeElementPosition(newCurrentIngredients));
    },
    [currentIngredients, dispatch]
  );

  const ref = useRef(null);
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

export default ConstructorFillingIngredient;
