import React, { Component } from "react";
import ScreenComponent from "../../common/ScreenComponent";
import GraphEditorMenu from "./editor_dependencies/preview_3d/GraphEditorMenu";
import ShaderGraphEditorComponent from "../../../editor_screens/ShaderGraphEditorComponent";

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
        <ShaderGraphEditorComponent
          dimensions={{ width: this.state.width, height: this.state.height }}
        />
      </div>
    );
  }
}
