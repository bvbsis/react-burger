import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { closeModal } from "../../services/actions/modal";
import Spinner from "../spinner/spinner";
import { Outlet } from "react-router-dom";
import Err from "../error/error";
import useAuth from "../../services/useAuth";
import { GET_USER_DATA_SUCCESS } from "../../services/actions/user";

function App() {
  const { currentModal, isOpen } = useSelector((store) => store.modal);
  const auth = useAuth();
  const dispatch = useDispatch();
  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients);
  }, [dispatch]);

  useEffect(() => {
    async function getUserData() {
      const data = await auth.getUser();
      const { email, name } = data.user;
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        payload: { email, name },
      });
    }
    getUserData();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>

      <Spinner />
      <Err />
      <Modal handleClose={handleCloseModal}>
        {currentModal === "order-details" ? (
          <OrderDetails />
        ) : currentModal === "ingredient-details" ? (
          <IngredientDetails />
        ) : null}
      </Modal>
    </>
  );
}

export default App;
