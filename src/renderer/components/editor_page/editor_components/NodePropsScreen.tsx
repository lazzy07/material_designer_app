import React, { Component } from "react";
import NodePropertiesComponent from "../../../editor_screens/NodePropertiesComponent";
import ScreenComponent from "../../common/ScreenComponent";

export default class NodePropsScreen extends ScreenComponent {
  render() {
    return (
      <div>
        <NodePropertiesComponent width={this.state.width} />
      </div>
    );
  }
}
