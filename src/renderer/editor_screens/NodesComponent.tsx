import React, { Component } from 'react'
import { LOCAL_NODES_PATH, PROJECT_NODES_PATH } from '../constants/Path'
import { NodeData } from '../../interfaces/NodeData';
import NodePreviewItem from '../components/library_components/NodePreviewItem';
import DropFiles from '../components/editor_page/editor_components/editor_dependencies/common/DropFiles';
import InputBox from '../components/form/InputBox';
import { getAllNodes } from '../services/NodeServices';
import { ipcRenderer } from 'electron';
import { IpcMessages } from '../../IpcMessages';

interface State {
  localNodes: NodeData[];
  projectNodes: NodeData[];
}

interface Props {
  dimensions: { height: number, width: number }
}

class NodesComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      localNodes: [],
      projectNodes: []
    };
  };


  readLocalLibrary = async () => {
    const NODES_PATH = LOCAL_NODES_PATH;
    ipcRenderer.send(IpcMessages.LOAD_LOCAL_LIBRARY_NODES, NODES_PATH);
  }

  readProjectLibrary = async () => {
    const NODES_PATH = PROJECT_NODES_PATH();

    if (NODES_PATH) {
      ipcRenderer.send(IpcMessages.LOAD_LOCAL_PROJECT_NODES, NODES_PATH);
    }
  }

  renderNode = (nodeData: NodeData[], keyPrefix: string) => {
    return nodeData.map((ele, index) => {
      return <NodePreviewItem key={keyPrefix + index} data={ele} />
    })
  }

  componentDidMount = () => {
    this.readLocalLibrary();
    this.readProjectLibrary();

    ipcRenderer.on(IpcMessages.REFRESH_LOCAL_LIBRARY_NODES, (_, data) => {
      this.setState({
        localNodes: data
      })
    })

    ipcRenderer.on(IpcMessages.REFRESH_LOCAL_PROJECT_NODES, (_, data) => {
      this.setState({
        projectNodes: data
      })
    })
  };


  render() {
    return (
      <div>
        <div style={{ paddingLeft: "25px", paddingTop: "10px" }}>
          <InputBox
            id={"searchNodes"}
            value={""}
            placeHolder={"Search Nodes"}
            onChange={() => { }}
          />
        </div>
        <DropFiles
          accept={["image/jpeg", "image/png", "image/jpg"]}
          onAccept={e => console.log(e)}
        >

          <div
            style={{
              width: this.props.dimensions.width,
              height: this.props.dimensions.height
            }}
          >
            {this.renderNode(this.state.localNodes, "local")}
            {this.renderNode(this.state.projectNodes, "project")}
          </div>
        </DropFiles>
      </div>
    )
  }
}

export default NodesComponent;