import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import ColorPickerScreen from "./screens/ColorPickerScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" component={ColorPickerScreen} />
      </Switch>
    </MemoryRouter>
  );
});
