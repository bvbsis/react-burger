import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";
import ConstructorPage from "./pages/constructor/constructor";
import { Orders, Profile, AccountPage } from "./pages/account";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import {
  ConfirmPasswordResetPage,
  SendPasswordResetEmailPage,
} from "./pages/forgot-password";
import NotFoundPage from "./pages/404";
import { ProtectedRoute } from "./components/protected-route";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<ConstructorPage />} />
              <Route
                path="profile/*"
                element={
                  <ProtectedRoute navigateTo="/login">
                    <AccountPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegistrationPage />} />
              <Route
                path="forgot-password"
                element={<SendPasswordResetEmailPage />}
              />
              <Route
                path="reset-password"
                element={<ConfirmPasswordResetPage />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
