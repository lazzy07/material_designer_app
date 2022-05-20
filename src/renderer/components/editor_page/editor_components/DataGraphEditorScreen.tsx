import React, { Component } from "react";
import ScreenComponent from "../../common/ScreenComponent";
import GraphEditorMenu from "./editor_dependencies/preview_3d/GraphEditorMenu";
import DataGraphEditorComponent from "../../../editor_screens/DataGraphEditorComponent";

interface Props {}

interface State {}

export default class GraphEditorScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div
        style={{ width: this.state.width, height: this.state.height }}
        className="dropper"
      >
        <GraphEditorMenu />
        <DataGraphEditorComponent
          dimensions={{ width: this.state.width, height: this.state.height }}
        />
      </div>
    );
  }
}
