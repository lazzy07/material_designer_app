import React, { Component } from "react";
import { nodesBBox } from "../../../../packages/area-plugin/utils";
import { Node } from "../../../../packages/rete-1.4.4";

interface Props {
  emitter: string;
  name: string;
  node: Node;
}

export default class NameControllerRenderer extends Component<Props, any> {
  render() {
    return (
      <div
        style={{
          height: "120px",
          padding: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>{this.props.node.name}</h2>
      </div>
    );
  }
}
