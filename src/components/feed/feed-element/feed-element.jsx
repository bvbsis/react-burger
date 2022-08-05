import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./feed-element.module.css";

const FeedElement = ({
  ingredients,
  status,
  _id,
  name,
  createdAt,
  updatedAt,
  number,
}) => {
  const allIngredients = useSelector((store) => store.ingredients.items);
  const requiredIngredients = ingredients.slice(0, 5);
  const price = ingredients
    ? ingredients.reduce((sum, current) => {
        console.log(
          allIngredients?.find((ingredient) => ingredient._id === current)
        );
        return (
          allIngredients?.find((ingredient) => ingredient._id === current) + sum
        );
      }, 0)
    : 0;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <span className="text_type_digits-default">{`#${number}`}</span>
        <span className="text_type_main-default">{createdAt}</span>
      </div>
      <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {requiredIngredients.map((ingredientId) => {
            const currentIngredient = allIngredients.find(
              (ingredient) => ingredient._id === ingredientId
            );
            return (
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${currentIngredient?.image_mobile})`,
                }}
              />
            );
          })}
          {ingredients.length < 6 ? null : (
            <>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${
                    allIngredients.find(
                      (ingredient) => ingredient._id === ingredients[5]
                    )?.image_mobile
                  })`,
                }}
              />
              <span
                className={`${styles.plusElement} text text_type_main-default`}
              >{`+${ingredients.length - 5}`}</span>
            </>
          )}
        </div>
        <div className={styles.priceContainer}>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedElement;
