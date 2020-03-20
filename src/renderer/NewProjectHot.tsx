import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import NewProjectScreen from "./screens/NewProjectScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={NewProjectScreen} />
      </Switch>
    </MemoryRouter>
  );
});
