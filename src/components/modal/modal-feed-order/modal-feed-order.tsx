import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./modal-feed-order.module.css";
import moment from "moment";
import { Obj } from "reselect/es/types";
import "moment/locale/ru";
import { useSelector } from "../../../utils/hook";
moment.locale("ru");

const ModalFeedOrder = () => {
  const { orders } = useSelector((store) => store.ws.ordersData);
  const allIngredients = useSelector((store) => store.ingredients.items);
  const { number } = useParams();
  const currentOrder = useMemo(() => {
    if (number) {
      return orders?.find((order) => order.number === +number);
    }
  }, [number, orders]);

  const ingredientsCount = useMemo(() => {
    return currentOrder?.ingredients?.reduce((sum: Obj<number>, ingredientId) => {
      if (ingredientId in sum) {
        return { ...sum, [ingredientId]: sum[ingredientId] + 1 };
      } else {
        return { ...sum, [ingredientId]: 1 };
      }
    }, {});
  }, [currentOrder]);

  const formattedDate = useMemo(() => {
    return moment(currentOrder?.updatedAt).calendar();
  }, [currentOrder?.updatedAt]);

  const arrayWithoutDuplicates = useMemo(() => {
    return [...new Set(currentOrder?.ingredients)];
  }, [currentOrder]);

  const totalPrice = useMemo(() => {
    return currentOrder?.ingredients?.length && allIngredients.length
      ? currentOrder.ingredients.reduce((sum, current) => {
          const ingredient = allIngredients.find(
            (ingredient) => ingredient._id === current
          );
          return !ingredient ? sum : ingredient.price + sum;
        }, 0)
      : 0;
  }, [allIngredients, currentOrder]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <span
          className={`${styles.number} text text_type_digits-default`}
        >{`#${currentOrder?.number}`}</span>
        <h3 className={`${styles.name} text text_type_main-medium`}>
          {currentOrder?.name}
        </h3>
        <span
          className="text text_type_main-default"
          style={{ color: "#00CCCC", marginBottom: "60px" }}
        >
          {"Выполнен"}
        </span>
        <span className={`text text_type_main-medium`}>{"Состав:"}</span>
        <ul className={`${styles.list} text text_type_main-medium`}>
          {arrayWithoutDuplicates?.map((ingredientId, index) => {
            const currentIngredient = allIngredients?.find(
              (ingredient) => ingredient._id === ingredientId
            );
            const count = ingredientsCount ? ingredientsCount[ingredientId] : 0;
            return (
              <li key={index} className={styles.ingredientWrapper}>
                <div className={styles.imageConatiner}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${currentIngredient?.image_mobile})`,
                    }}
                  />
                  <span className={`text text_type_main-default`}>
                    {currentIngredient?.name}
                  </span>
                </div>
                <div className={styles.ingredientPriceContainer}>
                  <span
                    className={`${styles.ingredientPrice} text text_type_digits-default`}
                  >{`${count} \u00D7 ${currentIngredient?.price}`}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.priceWrapper}>
          <span className="text text_type_main-default text_color_inactive">
            {formattedDate}
          </span>
          <div className={styles.priceContainer}>
            <span className="text text_type_digits-default">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFeedOrder;
