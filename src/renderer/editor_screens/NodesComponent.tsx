import React, { Component } from 'react'
import { LOCAL_NODES_PATH, PROJECT_NODES_PATH } from '../constants/Path'
import { getAllFiles, readJsonFile } from '../services/FileServices';
import Path from 'path';
import { NodeData } from '../../interfaces/NodeData';
import NodePreviewItem from '../components/library_components/NodePreviewItem';
import DropFiles from '../components/editor_page/editor_components/editor_dependencies/common/DropFiles';
import InputBox from '../components/form/InputBox';

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

    try {
      const data = await this.getAllNodes(NODES_PATH);

      this.setState({
        localNodes: data
      })
    } catch (err) {
      //TODO:: Handle error
      console.log(err);
    }
  }

  readProjectLibrary = async () => {
    const NODES_PATH = PROJECT_NODES_PATH();

    if (NODES_PATH) {
      try {
        const data = await this.getAllNodes(NODES_PATH);

        this.setState({
          projectNodes: data
        })
      } catch (err) {
        //TODO:: Handle Error
        console.log(err);
      }
    }
  }

  getAllNodes = (path: string): Promise<NodeData[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const files = await getAllFiles(path);
        let nodeData: NodeData[] = [];

        for (const file of files) {
          const filePath = Path.join(path, file);
          const data: NodeData = await readJsonFile(filePath);
          nodeData.push(data);
        }

        resolve(nodeData);
      } catch (err) {
        reject(err);
      }
    })
  }

  renderNode = (nodeData: NodeData[], keyPrefix: string) => {
    return nodeData.map((ele, index) => {
      return <NodePreviewItem key={keyPrefix + index} data={ele} />
    })
  }

  componentDidMount = () => {
    this.readLocalLibrary();
    this.readProjectLibrary();
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