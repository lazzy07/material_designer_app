import React, { Component } from "react";
import { ColorLUT } from "../../interfaces/ColorLutData";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { getSelectedNode } from "../services/NodeServices";
import { nodePropertiesToElements } from "../services/DataGraphToElements";
import "../scss/graphcomponentproperties.scss";

interface Props {
  selectedNode: number;
  selectedGraph: Graphs | null;
  selectedGraphType: GRAPH_TYPES | null;
  width: number;
}

interface State {}

class GraphPropertiesComponent extends Component<Props, State> {
  renderNodeData = () => {
    const node = getSelectedNode(
      this.props.selectedGraph,
      this.props.selectedGraphType,
      this.props.selectedNode
    );

    if (node) {
      return nodePropertiesToElements(
        node,
        this.props.selectedGraph!,
        this.props.selectedGraphType!
      );
    }

    return null;
  };

  render() {
    return (
      <div style={{ width: this.props.width, padding: "10px 10px" }}>
        {this.renderNodeData()}
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    selectedNode: state.system.selectedItems.node,
    selectedGraph: state.system.selectedItems.graph,
    selectedGraphType: state.system.selectedItems.graphType,
  };
};

export default connect(mapStateToProps)(GraphPropertiesComponent);
