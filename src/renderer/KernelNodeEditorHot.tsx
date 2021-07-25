import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import PreferencesScreen from "./screens/PreferencesScreen";
import KernelNodeEditor from "./screens/KernelNodeEditor";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={KernelNodeEditor} />
      </Switch>
    </MemoryRouter>
  );
});
