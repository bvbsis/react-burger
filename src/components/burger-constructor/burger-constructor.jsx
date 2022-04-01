import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import constructorStyles from "./burger-constructor.module.css";

import { CurrentIngredientsContext } from "../../utils/ingredients-context";

const BurgerConstructor = React.memo(({ modalState, setModalState }) => {
  const { currentIngredients } = useContext(CurrentIngredientsContext);
  const [price, setPrice] = useState(0);
  const [constructorIngredients, setConstructorIngredients] = useState([]);
  const [currentBun, setCurrentBun] = useState({});

  useEffect(() => {
    const currentBun = currentIngredients.filter(
      (ingredient) => ingredient.type === "bun"
    )[0];
    setCurrentBun(currentBun);
  }, [currentIngredients]);

  useEffect(() => {
    const newConstructorIngredients = currentIngredients.filter(
      (ingredient) => ingredient.type !== "bun"
    );
    setConstructorIngredients(newConstructorIngredients);
  }, [currentIngredients]);

  useEffect(() => {
    const newPrice =
      constructorIngredients.reduce((sum, ingredient) => {
        return sum + ingredient.price;
      }, 0) +
      currentBun.price * 2;
    setPrice(newPrice);
  }, [constructorIngredients, currentBun]);

  const onButtonClick = () => {
    const currentIngredientsId = currentIngredients.map(
      (ingredient) => ingredient._id
    );
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: currentIngredientsId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) =>
        setModalState({
          ...modalState,
          isOpen: true,
          currentModal: "order-details",
          order: { identificator: data.order.number },
        })
      )
      .catch((err) => console.error(err));
  };

  return (
    <section className={constructorStyles.burgerConstructor}>
      <div className={constructorStyles.burgerConstructor__ingredients}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={currentBun.name + " (верх)"}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
        />

        <div className={constructorStyles.burgerConstructor__filling}>
          {constructorIngredients.map((ingredient) => {
            return (
              <div
                key={ingredient._id}
                className={constructorStyles.burgerConstructor__elWrapper}
              >
                <div className={constructorStyles.burgerConstructor__dragger} />
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

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={currentBun.name + " (низ)"}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
        />
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
