import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import NewProjectScreen from "./screens/NewProjectScreen";
import ImportScreen from "./screens/ImportScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={ImportScreen} />
      </Switch>
    </MemoryRouter>
  );
});
