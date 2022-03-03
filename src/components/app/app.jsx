import React from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients />
        </main>
      </>
    );
  }
}

export default App;
