import React from "react";
import objectTypes from "../../utils/constants";
import PropTypes from "prop-types";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = React.memo(
  ({
    currentBun,
    ingredients,
    currentIngredientsId,
    modalState,
    setModalState,
  }) => {
    const constructorIngredients = ingredients.filter((ingredient) => {
      if (
        currentIngredientsId.includes(ingredient._id) &&
        ingredient.type !== "bun"
      ) {
        return ingredient;
      } else {
        return undefined;
      }
    });

    const onButtonClick = () => {
      setModalState({
        ...modalState,
        isOpen: true,
        currentModal: "order-details",
      });
    };

    return (
      <section className={constructorStyles.constructor}>
        <div className={constructorStyles.ingredients}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={currentBun.name}
            price={currentBun.price}
            thumbnail={currentBun.image_mobile}
          />

          <div className={constructorStyles.filling}>
            {constructorIngredients.map((ingredient) => {
              return (
                <div
                  key={ingredient._id}
                  className={constructorStyles.constructorElWrapper}
                >
                  <div className={constructorStyles.dragger} />
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
            text={currentBun.name}
            price={currentBun.price}
            thumbnail={currentBun.image_mobile}
          />
        </div>

        <div className={constructorStyles.submit_wrapper}>
          <div className={constructorStyles.price_wrapper}>
            <p
              className={`text text_type_digits-medium ${constructorStyles.price_digit}`}
            >
              610
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={onButtonClick} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
);

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ...objectTypes,
    })
  ),
  currentBun: PropTypes.shape({
    ...objectTypes,
  }),
  currentIngredientsId: PropTypes.arrayOf(PropTypes.string),
  modalState: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    ingredient: PropTypes.object.isRequired,
    heading: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
    ]),
    order: PropTypes.shape({ identificator: PropTypes.string.isRequired }),
    currentModal: PropTypes.string,
  }),
  setModalState: PropTypes.func.isRequired,
};

export default BurgerConstructor;
