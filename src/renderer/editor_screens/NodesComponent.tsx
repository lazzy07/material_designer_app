import React, { Component } from 'react'
import { LOCAL_NODES_PATH, PROJECT_NODES_PATH } from '../constants/Path'
import { getAllFiles, readJsonFile } from '../services/FileServices';
import Path from 'path';
import { NodeData } from '../../interfaces/NodeData';

interface State {
  localNodes: NodeData[];
  projectNodes: NodeData[];
}

interface Props {
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

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default NodesComponent;