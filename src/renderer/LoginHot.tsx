import { hot } from "react-hot-loader/root";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import SignupScreen from "./screens/SignupScreen";

export default hot(() => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/signup" component={SignupScreen} />
        <Route path="/" component={LoginScreen} />
      </Switch>
    </MemoryRouter>
  );
});
