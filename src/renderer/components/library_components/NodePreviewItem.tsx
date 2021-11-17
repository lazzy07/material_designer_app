import React, { Component } from "react";
import { Graphs } from "../../../interfaces/Graphs";
import { NODE_TYPES } from "../../../graph_node_functionality/NodeTypes";
import { defaultColors } from "../../constants/Colors";
import { getNodeColor } from "./../../services/NodeColors";
import DraggableComponent from "./DraggableComponent";

interface Props {
  data: Graphs;
}

export default class NodePreviewItem extends Component<Props> {
  getColor = () => {
    const { type } = this.props.data;
    let nodeType: string = "generator.color";

    if (type === "dataGraph") {
      nodeType = this.props.data.dataGraph?.ioType + ".color";
    }

    return nodeType as NODE_TYPES;
  };

  renderIcon = () => {
    const { name } = this.props.data;

    const nodeColor = getNodeColor(this.getColor());
    const firstLetter = name[0].toUpperCase();

    return (
      <div
        style={{
          width: 35,
          height: 35,
          borderRadius: "50%",
          backgroundColor: nodeColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 25,
            color: defaultColors.DEFAULT_BACKGROUND_COLOR,
            fontWeight: "bolder",
          }}
        >
          {firstLetter}
        </div>
      </div>
    );
  };

  renderType = () => {
    let type = "";
    if (this.props.data.type === "dataGraph") {
      type = this.props.data.dataGraph?.ioType || "";
    }

    return <div>{type}</div>;
  };

  render() {
    return (
      <DraggableComponent
        data={{ item: this.props.data, itemType: "node" }}
        name={this.props.data.id}
      >
        <div
          className="imagePreview"
          style={{
            marginLeft: 10,
            paddingLeft: 5,
            paddingRight: 5,
            marginRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
          }}
        >
          <div style={{ paddingRight: 20 }}>{this.renderIcon()}</div>
          <div>
            <div
              style={{
                color: getNodeColor(this.getColor()),
                fontWeight: "bolder",
              }}
            >
              {this.props.data.name}
            </div>
            <div style={{ marginTop: -9 }}>{this.renderType()}</div>
          </div>
        </div>
      </DraggableComponent>
    );
  }
}
