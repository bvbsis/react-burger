import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
const API_URL = "https://norma.nomoreparties.space/api/ingredients";
const ORDER = {
  identificator: "034536",
};

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [currentBun, setCurrentBun] = useState({
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  });
  const [currentIngredientsId, setCurrentIngredientsId] = useState([
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733cf",
    "60d3b41abdacab0026a733c8",
    "60d3b41abdacab0026a733cb",
    "60d3b41abdacab0026a733d3",
    "60d3b41abdacab0026a733d0",
  ]);

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
      <ModalOverlay>
        <Modal heading="Детали ингредиента">
          <IngredientDetails ingredient={{
            _id: "60d3b41abdacab0026a733cb",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: 0
        }} />
        </Modal>
      </ModalOverlay>

      <AppHeader />

      <main className={appStyles.main}>
        <BurgerIngredients
          setCurrentIngredientsId={setCurrentIngredientsId}
          currentIngredientsId={currentIngredientsId}
          array={ingredients}
        />
        <BurgerConstructor
          setCurrentBun={setCurrentBun}
          currentIngredientsId={currentIngredientsId}
          ingredients={ingredients}
          currentBun={currentBun}
        />
      </main>
    </>
  );
}

export default App;
