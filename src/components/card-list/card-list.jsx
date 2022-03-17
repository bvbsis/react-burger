import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card";
import listStyles from "./card-list.module.css";
import objectTypes from "../../utils/constants";

const CardList = React.memo(
  ({
    array,
    type,
    heading,
    currentIngredientsId,
    modalState,
    setModalState,
  }) => {
    const arr = array.filter((ingredient) => ingredient.type === type);

    return arr.length ? (
      <div>
        <h2 className="text text_type_main-medium mt-10">{heading}</h2>
        <ul className={listStyles.cardList__list}>
          {arr.map((ingredient) => (
            <Card
              modalState={modalState}
              setModalState={setModalState}
              currentIngredientsId={currentIngredientsId}
              key={ingredient._id}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </div>
    ) : (
      <></>
    );
  }
);

CardList.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      ...objectTypes,
    })
  ),
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
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

export default CardList;
