import { memo, useCallback, useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PlugConstructorElement from "./plug-constructor-element/plug-constructor-element";
import { getOrderDetails } from "../../services/actions/burger-constructor";
import { addElementToConstructor } from "../../services/actions/burger-constructor";

import constructorStyles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorFillingIngredient from "./constructor-filling-ingredient/constructor-filling-ingredient";
import { useLocation, useNavigate } from "react-router-dom";

const BurgerConstructor = memo(() => {
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
      dispatch(addElementToConstructor(item));
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  }));
  const outline = isHovered ? "3px solid green" : "none";
  const price = useMemo(() => {
    if (fillings.length && bun.price) {
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

  const currentIngredientsId = useCallback(() => {
    const fillingsID = fillings.map((ingredient) => ingredient._id);
    return [...fillingsID, bun._id];
  }, [fillings, bun]);

  const onButtonClick = () => {
    if (name) {
      dispatch(getOrderDetails(navigate, location, currentIngredientsId())
      );
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
        {bun._id ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (????????)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : (
          <PlugConstructorElement type="top" description="???????? ??????????" />
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
              description="?? ???????? ??????????????"
            />
          )
        ) : null}

        {bun._id ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (??????)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : (
          <PlugConstructorElement type="bottom" description="???????? ??????????" />
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
          <Button onClick={onButtonClick} type="primary" size="large">
            ???????????????? ??????????
          </Button>
        </div>
      ) : null}
    </section>
  );
});

export default BurgerConstructor;
