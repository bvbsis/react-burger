import {
  getIngredients,
  unsetIngredientsError,
} from "../../services/redux/actions/burger-ingredients";
import Modal from "../modal/modal";
import ModalIngredientDetails from "../modal-ingredient-details/modal-ingredient-details";
import Spinner from "../spinner/spinner";

import ErrorIndicator from "../error-indicator/error-indicator";
import { getUserData, unsetUserError } from "../../services/redux/actions/user";
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
import OrderDetails from "../order-details/order-details";
import { unsetConstructorError } from "../../services/redux/actions/burger-constructor";
import FeedPage from "../../pages/feed-page/feed-page";
import { wsStartConnection } from "../../services/redux/actions/ws";
import FeedOrder from "../feed-order/feed-order";

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
  const { isWsError, wsError } = useSelector((store) => store.ws);

  const isUserDataLoading = useSelector((store) => store.user.isLoading);
  const isIngredientsDataloading = useSelector(
    (store) => store.ingredients.isLoading
  );
  const isOrderDataloading = useSelector(
    (store) => store.burgerConstructor.isLoading
  );

  const isWsLoading = useSelector((store) => store.ws.isWsLoading);

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
    return isUserError || isIngredientsError || isConstructorError || isWsError;
  }, [isUserError, isIngredientsError, isConstructorError, isWsError]);

  const error = useMemo(() => {
    return isUserError
      ? userError
      : isIngredientsError
      ? ingredientsError
      : isConstructorError
      ? constructorError
      : isWsError
      ? wsError
      : null;
  }, [
    isUserError,
    userError,
    isIngredientsError,
    ingredientsError,
    isConstructorError,
    constructorError,
    isWsError,
    wsError,
  ]);

  const isLoading = useMemo(() => {
    return (
      isUserDataLoading ||
      isIngredientsDataloading ||
      isOrderDataloading ||
      isWsLoading
    );
  }, [
    isIngredientsDataloading,
    isOrderDataloading,
    isUserDataLoading,
    isWsLoading,
  ]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(wsStartConnection());
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
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:number" element={<FeedOrder />} />

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

      <Spinner isLoading={isLoading} />
      <ErrorIndicator isError={isError} error={error} unsetError={unsetError} />
    </>
  );
}

export default App;
