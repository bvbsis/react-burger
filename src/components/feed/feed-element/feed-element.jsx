import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./feed-element.module.css";
import moment from "moment";
import "moment/locale/ru";
import { Link, useLocation } from "react-router-dom";
moment.locale("ru");

const FeedElement = ({
  ingredients,
  status,
  name,
  createdAt,
  updatedAt,
  number,
}) => {
  const allIngredients = useSelector((store) => store.ingredients.items);
  const location = useLocation();
  const requiredIngredients = useMemo(() => {
    return ingredients.slice(0, 5);
  }, [ingredients]);
  const price = useMemo(() => {
    return ingredients.length && allIngredients.length
      ? ingredients.reduce((sum, current) => {
          const ingredient = allIngredients.find(
            (ingredient) => ingredient._id === current
          );
          return !ingredient ? sum : ingredient.price + sum;
        }, 0)
      : 0;
  }, [allIngredients, ingredients]);
  const formattedDate = useMemo(() => {
    return moment(updatedAt).calendar();
  }, [updatedAt]);

  return (
    <li className={styles.mainContainer}>
      <Link
        to={`/feed/${number}`}
        className={styles.link}
      >
        <div className={styles.container}>
          <span className="text_type_digits-default">{`#${number}`}</span>
          <span className="text_type_main-default">{formattedDate}</span>
        </div>
        <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            {requiredIngredients.map((ingredientId, index) => {
              const currentIngredient = allIngredients.find(
                (ingredient) => ingredient._id === ingredientId
              );
              return (
                <div
                  key={index}
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
            <span className={`${styles.price} text_type_digits-default`}>
              {price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeedElement;
