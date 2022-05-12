import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PlugConstructorElement from "../plug-constructor-element/plug-constructor-element";
import { getOrderDetails } from "../../services/actions/burger-constructor";
import { OPEN_ORDER_MODAL } from "../../services/actions/modal";
import { addElementToConstructor } from "../../services/actions/burger-constructor";

import constructorStyles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorFillingIngredient from "../constructor-filling-ingredient/constructor-filling-ingredient";

const BurgerConstructor = memo(() => {
  const dispatch = useDispatch();
  const { currentIngredients } = useSelector(
    (store) => store.burgerConstructor
  );
  const [{ isHovered }, ConstructorDrop] = useDrop(() => ({
    accept: "INGREDIENT_NEW",
    drop(item) {
      addElementToConstructor(dispatch, item);
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver(),
    }),
  }));

  const outline = isHovered ? "3px solid green" : "none";

  const currentBun = useMemo(() => {
    if (currentIngredients && currentIngredients.length) {
      return currentIngredients.filter(
        (ingredient) => ingredient.type === "bun"
      )[0];
    }
  }, [currentIngredients]);

  const constructorIngredients = useMemo(() => {
    if (currentIngredients.length) {
      return currentIngredients.filter(
        (ingredient) => ingredient.type !== "bun"
      );
    }
  }, [currentIngredients]);

  const price = useMemo(() => {
    if (constructorIngredients && currentBun) {
      return (
        constructorIngredients.reduce((sum, ingredient) => {
          return sum + ingredient.price;
        }, 0) +
        currentBun.price * 2
      );
    } else {
      return null;
    }
  }, [constructorIngredients, currentBun]);

  const currentIngredientsId = useMemo(() => {
    return currentIngredients.map((ingredient) => ingredient._id);
  }, [currentIngredients]);

  const onButtonClick = () => {
    dispatch((dispatch) => getOrderDetails(dispatch, currentIngredientsId));
    dispatch({
      type: OPEN_ORDER_MODAL,
    });
  };

  return (
    <section className={constructorStyles.burgerConstructor}>
      <div
        style={{ outline, borderRadius: "40px" }}
        ref={ConstructorDrop}
        className={constructorStyles.burgerConstructor__ingredients}
      >
        {currentBun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={currentBun.name + " (верх)"}
            price={currentBun.price}
            thumbnail={currentBun.image_mobile}
          />
        ) : (
          <PlugConstructorElement type="top" description="Сюда булку" />
        )}

        {constructorIngredients ? (
          constructorIngredients?.length ? (
            <div className={constructorStyles.burgerConstructor__filling}>
              {constructorIngredients.map((ingredient, index) => (
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

        {currentBun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={currentBun.name + " (низ)"}
            price={currentBun.price}
            thumbnail={currentBun.image_mobile}
          />
        ) : (
          <PlugConstructorElement type="bottom" description="Сюда булку" />
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
            Оформить заказ
          </Button>
        </div>
      ) : null}
    </section>
  );
});

BurgerConstructor.propTypes = {
  modalState: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    ingredient: PropTypes.object.isRequired,
    heading: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]),
    order: PropTypes.shape({ identificator: PropTypes.number.isRequired }),
    currentModal: PropTypes.string,
  }),
  setModalState: PropTypes.func.isRequired,
};

export default BurgerConstructor;
