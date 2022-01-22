import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.app}>
        <AppHeader />
        <Button type="primary" size="medium">
          Нажми на меня
        </Button>
      </div>
    );
  }
}

export default App;
