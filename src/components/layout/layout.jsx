import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
