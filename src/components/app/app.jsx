import { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import data from "../../utils/data";

import appStyles from "./app.module.css";

import {
  InitialIngredientsContext,
  CurrentIngredientsContext,
} from "../../utils/ingredients-context";
import { ModalContext } from "../../utils/modal-context";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([
    ...data.currentIngredients,
  ]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    ingredient: {},
    heading: null,
    order: { identificator: 0 },
    currentModal: "order-details",
  });

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
    fetch(API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => setIngredients(data.data))
      .catch((err) => console.error(err));
  };

  useEffect(getIngredientsData, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <CurrentIngredientsContext.Provider
          value={{ currentIngredients, setCurrentIngredients }}
        >
          <InitialIngredientsContext.Provider
            value={{ ingredients, setIngredients }}
          >
            <ModalContext.Provider value={{ modalState, setModalState }}>
              <BurgerIngredients />
            </ModalContext.Provider>
          </InitialIngredientsContext.Provider>

          <BurgerConstructor
            modalState={modalState}
            setModalState={setModalState}
          />
        </CurrentIngredientsContext.Provider>
      </main>

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
    </>
  );
}

export default App;
