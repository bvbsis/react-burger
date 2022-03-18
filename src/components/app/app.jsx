import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import appStyles from "./app.module.css";
import data from "../../utils/data";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [currentBun, setCurrentBun] = useState({
    ...data.currentBun,
  });
  const [currentIngredientsId, setCurrentIngredientsId] = useState([
    ...data.currentIngredientsId,
  ]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    ingredient: {},
    heading: null,
    order: { identificator: "034536" },
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
      <AppHeader />

      <main className={appStyles.app}>
        <BurgerIngredients
          modalState={modalState}
          setModalState={setModalState}
          currentIngredientsId={currentIngredientsId}
          ingredients={ingredients}
        />
        <BurgerConstructor
          modalState={modalState}
          setModalState={setModalState}
          currentIngredientsId={currentIngredientsId}
          ingredients={ingredients}
          currentBun={currentBun}
        />
      </main>
    </>
  );
}

export default App;
