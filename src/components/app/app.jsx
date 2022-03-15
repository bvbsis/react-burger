import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);

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
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients array={ingredients} />
        <BurgerConstructor array={ingredients} />
      </main>
    </>
  );
}

export default App;
