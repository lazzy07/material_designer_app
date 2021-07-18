import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import ThemeScreen from "./screens/ThemeScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={ThemeScreen} />
      </Switch>
    </MemoryRouter>
  );
});
