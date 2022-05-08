import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PlugConstructorElement from "../plug-constructor-element/plug-constructor-element";
import { getOrderDetails } from "../../services/actions/burger-constructor";
import { OPEN_ORDER_MODAL } from "../../services/actions/modal";

import constructorStyles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const { currentIngredients } = useSelector(
    (store) => store.burgerConstructor
  );

  const currentBun = useMemo(() => {
    if (currentIngredients.length) {
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
    if (constructorIngredients) {
      return (
        constructorIngredients.reduce((sum, ingredient) => {
          return sum + ingredient.price;
        }, 0) +
        currentBun.price * 2
      );
    } else {
      return 0;
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
      <div className={constructorStyles.burgerConstructor__ingredients}>
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
          <div className={constructorStyles.burgerConstructor__filling}>
            {constructorIngredients.map((ingredient) => {
              return (
                <div
                  key={ingredient._id}
                  className={constructorStyles.burgerConstructor__elWrapper}
                >
                  <div
                    className={constructorStyles.burgerConstructor__dragger}
                  />
                  <ConstructorElement
                    type="center"
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <PlugConstructorElement type="center" description="А сюда начинку" />
        )}

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
