import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";

import appStyles from "./app.module.css";
import { closeModal } from "../../services/actions/modal";
import SignInPage from "../../pages/sign-in";
import RegistrationPage from "../../pages/registration";
import {
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";

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
    <Router>
      <AppHeader />
      <Switch>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/signin">
          <SignInPage />
        </Route>
        <Route exact path="/registration">
          <RegistrationPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route exact path="/">
          <main className={appStyles.app}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </Route>
      </Switch>

      {isOpen ? (
        <Modal handleClose={handleCloseModal}>
          {currentModal === "order-details" ? (
            <OrderDetails />
          ) : currentModal === "ingredient-details" ? (
            <IngredientDetails />
          ) : null}
        </Modal>
      ) : null}
    </Router>
  );
}

export default App;
