import React, { Component } from "react";
import Button from "../components/graph_property_inputs/Button";
import InputAndSlider1 from "../components/graph_property_inputs/InputAndSlider1";
import InputAndSlider2 from "../components/graph_property_inputs/InputAndSlider2";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Switch from "../components/graph_property_inputs/Switch";
import ColorPicker3 from "../components/graph_property_inputs/ColorPicker3";
import ColorPicker1 from "../components/graph_property_inputs/ColorPicker1";
import Lut1 from "../components/graph_property_inputs/Lut1";
import { ColorLUT } from "../../interfaces/ColorLutData";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { Data } from "../../packages/rete-1.4.4/core/data";
import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import { getSelectedNode } from "../services/NodeServices";
import "../scss/graphcomponentproperties.scss";
import { DataGraph } from "../../interfaces/DataGraph";
import { nodePropertiesToElements } from "../services/DataGraphToElements";

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
      const graph: Graphs = node.data as any;
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
