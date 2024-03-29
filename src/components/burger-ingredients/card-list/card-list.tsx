import React, { FC, Ref } from "react";
import { useSelector } from "../../../utils/hook";

import Card from "../card/card";

import listStyles from "./card-list.module.css";

interface ICardListProps {
  listRef: Ref<any>;
  type: string;
  heading: string;
}

const CardList: FC<ICardListProps> = React.memo(({ listRef, type, heading }) => {
  const ingredients = useSelector((store) => store.ingredients.items);

  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  return filteredIngredients.length ? (
    <div ref={listRef}>
      <h2 className="text text_type_main-medium mt-10">{heading}</h2>
      <ul className={listStyles.cardList__list}>
        {filteredIngredients.map((ingredient) => (
          <Card key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </div>
  ) : null;
});

export default CardList;
