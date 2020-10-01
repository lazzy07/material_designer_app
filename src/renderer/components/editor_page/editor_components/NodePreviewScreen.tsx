import React, { Component } from "react";
import NodePreviewComponent from "../../../editor_screens/NodePreviewComponent";
import ScreenComponent from "../../common/ScreenComponent";
import NodePreviewMenu from "./editor_dependencies/node_preview/NodePreviewMenu";

interface Props { }

interface State { }

export default class NodePreviewScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <NodePreviewMenu />
        <NodePreviewComponent dimensions={{ width: this.state.width, height: this.state.height }} />
      </div>
    );
  }
}
