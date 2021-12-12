import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import { connect } from "react-redux";
import { GRAPH_TYPES } from "../../interfaces/Graphs";
import { Store } from "../../redux/reducers";

interface State {
  src: string;
}

interface Props {
  height: number;
  graphType: GRAPH_TYPES | null;
}

class FunctionEditorComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      src: "//Add your custom functions here\n",
    };
  }

  onChangeCode = (val: string) => {
    this.setState({
      src: val,
    });
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
        <MonacoEditor
          height={this.props.height}
          width="100%"
          language="cpp"
          theme="vs-dark"
          value={this.state.src}
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
  };
};

export default connect(mapStateToProps)(FunctionEditorComponent);
