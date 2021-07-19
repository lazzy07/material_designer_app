import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import PreferencesScreen from "./screens/PreferencesScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={PreferencesScreen} />
      </Switch>
    </MemoryRouter>
  );
});
