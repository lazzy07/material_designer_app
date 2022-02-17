import { faCode, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import { connect } from "react-redux";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { KernelGraphData } from "../../interfaces/KernelGraph";
import { editKernelData } from "../../redux/actions/GraphActions";
import { Store } from "../../redux/reducers";
import { defaultColors } from "../constants/Colors";

interface State {}

interface Props {
  height: number;
  width: number;
  graphType: GRAPH_TYPES | null;
  selectedGraph: Graphs | null;
  selectedGraphType: GRAPH_TYPES | null;
  onChange: (type: string, change: string) => void;
}
class FunctionEditorComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onChangeCode = (val: string) => {
    this.props.onChange("functions", val);
  };

  render() {
    return (
      <div>
        <div
          hidden={this.props.graphType == "kernelGraph"}
          style={{
            display: "flex",
            height: this.props.height,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: 10 }}>
            <FontAwesomeIcon icon={faCode} style={{ fontSize: 50 }} />
          </div>
          <div>
            <h4>Select a Kernel from the outliner</h4>
          </div>
          <div>
            <p>(Double click on any kernel graph to view the content)</p>
          </div>
        </div>
        <div
          style={{
            width: this.props.width,
            height: 37,
            backgroundColor: defaultColors.DEFAULT_BACKGROUND_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="customButton"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2px 5px",
            }}
          >
            Compile &nbsp;&nbsp; <FontAwesomeIcon icon={faPlay} />
          </div>
        </div>
        <MonacoEditor
          height={this.props.height}
          width="100%"
          language="cpp"
          theme="vs-dark"
          value={
            this.props.selectedGraph?.kernelGraph
              ? (this.props.selectedGraph?.kernelGraph!.data as KernelGraphData)
                  .functions
              : ""
          }
          onChange={this.onChangeCode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    graphType: state.system.selectedItems.graph
      ? state.system.selectedItems.graph.type
      : null,
    selectedGraph: state.system.selectedItems.graph,
    selectedGraphType: state.system.selectedItems.graphType,
  };
};

const mapActionsToProps = {
  onChange: editKernelData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FunctionEditorComponent);
