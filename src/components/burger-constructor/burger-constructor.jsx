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
  ({ currentBun, ingredients, currentIngredientsId, setCurrentBun }) => {
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

    // React.useEffect(() => {
    //   const buns = ingredients.filter((ingredient) => {
    //     if (
    //       currentIngredientsId.includes(ingredient._id) &&
    //       ingredient.type === "bun"
    //     ) {
    //       return ingredient;
    //     } else {
    //       return undefined;
    //     }
    //   });
    //   setCurrentBun(buns[0]);
    // }, [currentIngredientsId, ingredients, setCurrentBun]);

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
                <div className={constructorStyles.constructorElWrapper}>
                  <div className={constructorStyles.dragger} />
                  <ConstructorElement
                    key={ingredient._id}
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
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
);

BurgerConstructor.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      ...objectTypes,
    })
  ),
};

export default BurgerConstructor;
