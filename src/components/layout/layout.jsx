import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
