import React, { Component } from "react";
import { LOCAL_NODES_PATH, PROJECT_NODES_PATH } from "../constants/Path";
import { NodeData } from "../../interfaces/NodeData";
import NodePreviewItem from "../components/library_components/NodePreviewItem";
import DropFiles from "../components/editor_page/editor_components/editor_dependencies/common/DropFiles";
import InputBox from "../components/form/InputBox";
import { ipcRenderer } from "electron";
import { IpcMessages } from "../../IpcMessages";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";

interface Props {
  dimensions: { height: number; width: number };
  localDataNodes: Graphs[];
}

class DataNodesComponent extends Component<Props> {
  readLocalLibrary = async () => {
    const NODES_PATH = LOCAL_NODES_PATH;
    ipcRenderer.send(IpcMessages.LOAD_LOCAL_LIBRARY_NODES, NODES_PATH);
  };

  renderNode = (nodeData: Graphs[], keyPrefix: string) => {
    return nodeData.map((ele, index) => {
      return <NodePreviewItem key={keyPrefix + index} data={ele} />;
    });
  };

  componentDidMount = () => {
    this.readLocalLibrary();

    ipcRenderer.on(IpcMessages.REFRESH_LOCAL_LIBRARY_NODES, (_, data) => {
      this.setState({
        localNodes: data,
      });
    });
  };

  render() {
    const nodeLib = this.props.localDataNodes;

    return (
      <div>
        <div style={{ paddingLeft: "25px", paddingTop: "10px" }}>
          <InputBox
            id={"searchNodes"}
            value={""}
            placeHolder={"Search Nodes"}
            onChange={() => {}}
          />
        </div>
        <DropFiles
          accept={["image/jpeg", "image/png", "image/jpg"]}
          onAccept={(e) => console.log(e)}
        >
          <div
            style={{
              width: this.props.dimensions.width,
              height: this.props.dimensions.height,
            }}
          >
            {this.renderNode(nodeLib, "local")}
          </div>
        </DropFiles>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    localDataNodes: state.graphLibraries.dataGraphNodes,
  };
};

export default connect(mapStateToProps)(DataNodesComponent);
