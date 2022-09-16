import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  changeElementPosition,
  deleteElementFromConstructor,
} from "../../../services/redux/actions/burger-constructor";
import { useDispatch, useSelector } from "../../../utils/hook";
import { TConstructorElement } from "../../../utils/types/types";
import ConstructorFillingIngredientStyles from "./constructor-filling-ingredient.module.css";

interface IConstructorFillingIngredientProps {
  ingredient: TConstructorElement;
  index: number;
}

const ConstructorFillingIngredient: FC<IConstructorFillingIngredientProps> =
  memo(({ ingredient, index }) => {
    const dispatch = useDispatch();
    const ref = useRef<any>(null);

    const { fillings } = useSelector(
      (store) => store.burgerConstructor.currentIngredients
    );

    const [{ isDragging }, dragRef] = useDrag({
      type: "CURRENT_INGREDIENT",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, dropRef] = useDrop({
      accept: "CURRENT_INGREDIENT",
      hover(item: { index: number }, monitor) {
        const dragIndex = item.index;
        const dropIndex = index;
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY =
          monitor.getClientOffset()!.y - hoverBoundingRect.top;
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

    const dragDropRef = useRef<any>(dragRef(dropRef(ref)));

    const opacityDrag = isDragging ? 0.6 : 1;

    return (
      <div style={{ opacity: opacityDrag }} ref={dragDropRef.current}>
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
            // @ts-ignore
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
