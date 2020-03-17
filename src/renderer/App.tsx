import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "./routes";
import MainScreen from "./screens/MainScreen";

export default hot(
  (): JSX.Element => (
    <div>
      <BrowserRouter>
        <Route path={Routes.MAIN_SCREEN} component={MainScreen} />
      </BrowserRouter>
    </div>
  )
);
