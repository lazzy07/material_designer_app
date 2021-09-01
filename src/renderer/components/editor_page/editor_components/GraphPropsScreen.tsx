import React, { Component } from "react";
import GraphPropertiesComponent from "../../../editor_screens/GraphPropertiesComponent";
import ScreenComponent from "../../common/ScreenComponent";

export default class GraphPropsScreen extends ScreenComponent {
  render() {
    return (
      <div>
        <GraphPropertiesComponent />
      </div>
    );
  }
}
