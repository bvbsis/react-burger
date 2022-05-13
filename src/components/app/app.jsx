import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";

import appStyles from "./app.module.css";
import { closeModal } from "../../services/actions/modal";

function App() {
  const { currentModal, isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

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
        <Modal handleClose={handleCloseModal}>
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
