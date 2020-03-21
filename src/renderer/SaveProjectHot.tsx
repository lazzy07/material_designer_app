import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import SaveProjectScreen from "./screens/SaveProjectScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={SaveProjectScreen} />
      </Switch>
    </MemoryRouter>
  );
});
