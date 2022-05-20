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
import { compileKernel } from "../services/CompileKernel";

interface State {}

interface Props {
  height: number;
  width: number;
  selectedGraph: Graphs | null;
  selectedGraphType: GRAPH_TYPES | null;
  onChange: (id: string, type: string, change: string) => void;
}
class KernelEditorComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onChangeCode = (val: string) => {
    this.props.onChange(this.props.selectedGraph!.id, "kernel", val);
  };

  render() {
    return (
      <div>
        <div
          hidden={this.props.selectedGraphType == "kernelGraph"}
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
            onClick={compileKernel}
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
          width={this.props.width}
          language="cpp"
          theme="vs-dark"
          value={
            this.props.selectedGraph?.kernelGraph
              ? (this.props.selectedGraph?.kernelGraph!.data as KernelGraphData)
                  .kernel
              : ""
          }
          onChange={this.onChangeCode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  const graph = state.project.packages[
    state.system.selectedItems.graphId
  ] as Graphs;

  return {
    selectedGraph: graph,
    selectedGraphType: graph ? graph.type : null,
  };
};

const mapActionsToProps = {
  onChange: editKernelData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(KernelEditorComponent);
