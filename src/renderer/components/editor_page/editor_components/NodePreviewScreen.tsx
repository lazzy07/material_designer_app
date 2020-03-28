import React, { Component } from "react";
import ScreenComponent from "../../common/ScreenComponent";
import NodePreviewMenu from "./editor_dependencies/node_preview/NodePreviewMenu";

interface Props {}

interface State {}

export default class NodePreviewScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <NodePreviewMenu />
      </div>
    );
  }
}
