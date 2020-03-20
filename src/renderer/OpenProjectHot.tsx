import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, HashRouter, MemoryRouter } from "react-router-dom";
import OpenProjectScreen from "./screens/OpenProjectScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={OpenProjectScreen} />
      </Switch>
    </MemoryRouter>
  );
});
