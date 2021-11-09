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

interface State {
  colors: ColorLUT[];
}

class GraphPropertiesComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      colors: [
        {
          color: "#000000",
          pos: "0.0",
        },
        {
          color: "#ffffff",
          pos: "1.0",
        },
      ],
    };
  }

  renderNodeData = () => {
    const node = getSelectedNode(
      this.props.selectedGraph,
      this.props.selectedGraphType,
      this.props.selectedNode
    );

    if (node) {
      return nodePropertiesToElements(node, this.props.selectedGraph!);
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
