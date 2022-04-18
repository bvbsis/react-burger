import { useEffect, useMemo, useState } from "react";
import apiUrl from "../../services/api-url";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import appStyles from "./app.module.css";

import {
  InitialIngredientsContext,
  CurrentIngredientsContext,
} from "../../services/ingredients-context";
import { ModalContext } from "../../services/modal-context";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    ingredient: {},
    heading: null,
    order: { identificator: 0 },
    currentModal: "order-details",
  });

  const ingredientsContextObject = useMemo(() => {
    return { ingredients, setIngredients };
  }, [ingredients, setIngredients]);

  const currentIngredientsContextObject = useMemo(() => {
    return { currentIngredients, setCurrentIngredients };
  }, [currentIngredients, setCurrentIngredients]);

  const modalContextObject = useMemo(() => {
    return { modalState, setModalState };
  }, [modalState, setModalState]);

  useEffect(() => {
    if (ingredients.length) {
      setCurrentIngredients(ingredients);
    }
  }, [ingredients]);

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
      heading: null,
      ingredient: {},
      currentModal: null,
    });
  };

  const getIngredientsData = () => {
    fetch(apiUrl("ingredients"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(getIngredientsData, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <CurrentIngredientsContext.Provider
          value={currentIngredientsContextObject}
        >
          <InitialIngredientsContext.Provider value={ingredientsContextObject}>
            <ModalContext.Provider value={modalContextObject}>
              <BurgerIngredients />
            </ModalContext.Provider>
          </InitialIngredientsContext.Provider>

          <BurgerConstructor
            modalState={modalState}
            setModalState={setModalState}
          />
        </CurrentIngredientsContext.Provider>
      </main>

      {modalState.isOpen ? (
        <Modal
          heading={modalState.heading}
          closeModal={closeModal}
          isOpen={modalState.isOpen}
        >
          {modalState.currentModal === "order-details" ? (
            <OrderDetails identificator={modalState.order.identificator} />
          ) : (
            <IngredientDetails ingredient={modalState.ingredient} />
          )}
        </Modal>
      ) : null}
    </>
  );
}

export default App;
