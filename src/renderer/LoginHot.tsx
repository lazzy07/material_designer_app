import { hot } from "react-hot-loader/root";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import { Switch, Route, HashRouter } from "react-router-dom";
import SignupScreen from "./screens/SignupScreen";

export default hot(() => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/signup" component={SignupScreen} />
        <Route path="/" component={LoginScreen} />
      </Switch>
    </HashRouter>
  );
});
