import {
  getIngredients,
  unsetIngredientsError,
} from "../../services/actions/burger-ingredients";
import Modal from "../modal/modal";
import ModalIngredientDetails from "../modal/modal-ingredient-details/modal-ingredient-details";
import Spinner from "../spinner/spinner";

import ErrorIndicator from "../error-indicator/error-indicator";
import { getUserData, unsetUserError } from "../../services/actions/user";
import ConstructorPage from "../../pages/constructor/constructor";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredient from "../ingredient/ingredient";
import OrderDetails from "../modal/order-details/order-details";
import { unsetConstructorError } from "../../services/actions/burger-constructor";

function App() {
  const location = useLocation();
  const { state, pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserError, userError } = useSelector((store) => store.user);
  const { isConstructorError, constructorError } = useSelector(
    (store) => store.burgerConstructor
  );
  const { isIngredientsError, ingredientsError } = useSelector(
    (store) => store.ingredients
  );

  const unsetError = useCallback(() => {
    if (isUserError) {
      dispatch(unsetUserError());
    }
    if (isIngredientsError) {
      dispatch(unsetIngredientsError());
    }
    if (isConstructorError) {
      dispatch(unsetConstructorError());
    }
  }, [dispatch, isConstructorError, isIngredientsError, isUserError]);

  const isError = useMemo(() => {
    return isUserError || isIngredientsError || isConstructorError;
  }, [isUserError, isIngredientsError, isConstructorError]);

  const error = useMemo(() => {
    return isUserError
      ? userError
      : isIngredientsError
      ? ingredientsError
      : isConstructorError
      ? constructorError
      : null;
  }, [
    isUserError,
    userError,
    isIngredientsError,
    ingredientsError,
    isConstructorError,
    constructorError,
  ]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route
            path="profile/*"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="login"
            element={
              <ProtectedRoute anonymous>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute anonymous>
                <RegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRoute anonymous>
                <SendPasswordResetEmailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRoute anonymous>
                <ConfirmPasswordResetPage />
              </ProtectedRoute>
            }
          />
          <Route path="ingredients/:id" element={<Ingredient />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && pathname.includes("ingredients") && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal handleClose={handleClose}>
                <ModalIngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {state?.backgroundLocation && pathname.includes("order") && (
        <Routes>
          <Route
            path="/order/:number"
            element={
              <Modal handleClose={handleClose}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      <Spinner />
      <ErrorIndicator isError={isError} error={error} unsetError={unsetError} />
    </>
  );
}

export default App;
