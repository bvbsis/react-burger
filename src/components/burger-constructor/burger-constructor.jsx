import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const img = ["https://code.s3.yandex.net/react/code/bun-02-mobile.png"];

function BurgerConstructor(props) {
  return (
    <section className={constructorStyles.constructor}>
      <div className={constructorStyles.ingredients} >
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img[0]}
        />

        {props.array.map((ingredient) => {
          return (
            <ConstructorElement
              key={ingredient._id}
              type="center"
              isLocked={false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image_mobile}
            />
          );
        })}

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img[0]}
        />
      </div>

      <div className={constructorStyles.submitWrapper}>
        <div className={constructorStyles.priceWrapper}>
          <p
            className={`text text_type_digits-medium ${constructorStyles.priceDigit}`}
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

export default BurgerConstructor;
