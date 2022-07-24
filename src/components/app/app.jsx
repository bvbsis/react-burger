import { getIngredients } from "../../services/actions/burger-ingredients";
import Modal from "../modal/modal";
import ModalIngredientDetails from "../modal/modal-ingredient-details/modal-ingredient-details";
import Spinner from "../spinner/spinner";

import ErrorIndicator from "../error-indicator/error-indicator";
import { useAuth } from "../../services/useAuth";
import { GET_USER_DATA_SUCCESS } from "../../services/actions/user";
import ConstructorPage from "../../pages/constructor/constructor";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route";
import { AccountPage, Orders, Profile } from "../../pages/account";
import LoginPage from "../../pages/login";
import RegistrationPage from "../../pages/register";
import {
  ConfirmPasswordResetPage,
  SendPasswordResetEmailPage,
} from "../../pages/forgot-password";
import NotFoundPage from "../../pages/404";
import Layout from "../layout/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredient from "../ingredient/ingredient";
import OrderDetails from "../modal/order-details/order-details";

function App() {
  const auth = useAuth();

  const { currentModal } = useSelector((store) => store.modal);

  const location = useLocation();
  const state = location.state;

  const dispatch = useDispatch();

  useEffect(() => {
    getIngredients(dispatch);
  }, [dispatch]);

  useEffect(() => {
    async function getUserData() {
      const data = await auth.getUser();
      const { email, name } = data.user;
      console.log("app request");
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        payload: { email, name },
      });
    }
    getUserData();
  }, [auth, dispatch]);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route
            path="profile/*"
            element={
              <ProtectedRoute navigateTo="/login">
                <AccountPage />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute navigateTo="/login">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute navigateTo="/login">
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route
            path="forgot-password"
            element={<SendPasswordResetEmailPage />}
          />
          <Route path="reset-password" element={<ConfirmPasswordResetPage />} />
          <Route path="ingredients/:id" element={<Ingredient />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && currentModal === "ingredient" && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal>
                <ModalIngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {currentModal === "order" && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}

      <Spinner />
      <ErrorIndicator />
    </>
  );
}

export default App;
