import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import appStyles from "./app.module.css";

function App() {
  const { currentModal, isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients);
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>

      {isOpen ? (
        <Modal>
          {currentModal === "order-details" ? (
            <OrderDetails />
          ) : currentModal === "ingredient-details" ? (
            <IngredientDetails />
          ) : null}
        </Modal>
      ) : null}
    </>
  );
}

export default App;
