import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "./routes";
import EditorScreen from "./screens/EditorScreen";

export default hot(
  (): JSX.Element => (
    <div>
      <BrowserRouter>
        <Route path={Routes.MAIN_SCREEN} component={EditorScreen} />
      </BrowserRouter>
    </div>
  )
);
