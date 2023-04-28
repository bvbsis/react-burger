import { memo, useMemo, FC } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PlugConstructorElement from "./plug-constructor-element/plug-constructor-element";
import { getOrderDetails } from "../../services/redux/actions/burger-constructor";
import { addElementToConstructor } from "../../services/redux/actions/burger-constructor";

import constructorStyles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import ConstructorFillingIngredient from "./constructor-filling-ingredient/constructor-filling-ingredient";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hook";
import { TIngredient } from "../../utils/types/types";

const BurgerConstructor: FC = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { bun, fillings } = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );
  const { name } = useSelector((store) => store.user);
  const [{ isHovered }, ConstructorDrop] = useDrop(() => ({
    accept: "INGREDIENT_NEW",
    drop(item) {
      dispatch(addElementToConstructor(item as TIngredient));
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  }));
  const outline = isHovered ? "3px solid green" : "none";
  const price = useMemo(() => {
    if (fillings.length && bun?.price) {
      return (
        fillings.reduce((sum, ingredient) => {
          return sum + ingredient.price;
        }, 0) +
        bun.price * 2
      );
    } else {
      return null;
    }
  }, [fillings, bun]);

  const currentIngredientsId = useMemo(() => {
    const fillingsId = fillings.map((ingredient) => ingredient._id);
    return [bun?._id, ...fillingsId, bun?._id];
  }, [fillings, bun]);

  const onButtonClick = () => {
    if (name) {
      dispatch(getOrderDetails(navigate, location, currentIngredientsId));
    } else {
      navigate("login", { state: location });
    }
  };

  return (
    <section className={constructorStyles.burgerConstructor}>
      <div
        style={{ outline, borderRadius: "40px" }}
        ref={ConstructorDrop}
        className={constructorStyles.burgerConstructor__ingredients}
      >
        {bun?._id ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : (
          <PlugConstructorElement type="top" description="Перетащи сюда булку :)" />
        )}

        {fillings ? (
          fillings?.length ? (
            <div className={constructorStyles.burgerConstructor__filling}>
              {fillings.map((ingredient, index) => (
                <ConstructorFillingIngredient
                  key={ingredient.uuid}
                  index={index}
                  ingredient={ingredient}
                />
              ))}
            </div>
          ) : (
            <PlugConstructorElement
              type="center"
              description="А сюда начинку"
            />
          )
        ) : null}

        {bun?._id ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : (
          <PlugConstructorElement type="bottom" description="И тут тоже должна быть булка" />
        )}
      </div>

      {price ? (
        <div className={constructorStyles.burgerConstructor__submitWrapper}>
          <div className={constructorStyles.burgerConstructor__priceWrapper}>
            <p
              className={`text text_type_digits-medium ${constructorStyles.burgerConstructor__priceDigit}`}
            >
              {price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={onButtonClick} type="primary" size="large" htmlType={"submit"}>
            Оформить заказ
          </Button>
        </div>
      ) : null}
    </section>
  );
});

export default BurgerConstructor;
