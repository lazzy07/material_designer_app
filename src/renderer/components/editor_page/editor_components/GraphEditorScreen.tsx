import React, { Component } from "react";
import { IS_WEB } from "../../../services/Webguard";
import ScreenComponent from "../../common/ScreenComponent";
import GraphEditorMenu from "./editor_dependencies/preview_3d/GraphEditorMenu";
import GraphEditorComponent from "../../../editor_screens/GraphEditorComponent";

interface Props {

}

interface State {

}

export default class GraphEditorScreen extends ScreenComponent<Props, State> {
  render() {
    return <div style={{ width: this.state.width, height: this.state.height }} className="dropper">
      <GraphEditorMenu />
      <GraphEditorComponent dimensions={{ width: this.state.width, height: this.state.height }} />
    </div>;
  }
}
