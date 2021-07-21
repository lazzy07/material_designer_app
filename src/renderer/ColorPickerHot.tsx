import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import ColorPickerScreen from "./screens/ColorPickerScreen";

export default hot((props: { color: string }) => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/">
          <ColorPickerScreen prevColor={props.color} />
        </Route>
      </Switch>
    </MemoryRouter>
  );
});
