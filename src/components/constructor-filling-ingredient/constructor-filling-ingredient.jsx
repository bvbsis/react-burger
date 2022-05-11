import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { changeElementPosition, deleteElementFromConstructor } from "../../services/actions/burger-constructor";
import ConstructorFillingIngredientStyles from "./constructor-filling-ingredient.module.css";

const ConstructorFillingIngredient = memo(({ ingredient, index }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CURRENT_INGREDIENT",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isHovered }, drop] = useDrop(() => ({
    accept: "CURRENT_INGREDIENT",
    drop(item) {
      dispatch(changeElementPosition(item, index))
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  }));

  const opacityDrag = isDragging ? 0.4 : 1;
  const opacityDrop = isHovered ? 0.6 : 1;

  return (
    <div style={{ opacity: opacityDrop }} ref={drop}>
      <div
        ref={drag}
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
          ref={drop}
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
