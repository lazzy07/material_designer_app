import React, { Component } from 'react'
import { defaultColors } from '../constants/Colors'
import { createGrid } from '../services/CreateGrid'
import DropFileComponent from '../components/library_components/DropFileComponent';
import { DraggableItem } from '../../interfaces/DraggableItem';
import { NodeData } from '../../interfaces/NodeData';
import { EDITOR_VERSION, ENGINE_VERSION } from '../constants/Versions';
import { getAllNodes } from '../services/NodeServices';
import { LOCAL_NODES_PATH, PROJECT_NODES_PATH } from '../constants/Path';

import Rete, { NodeEditor } from "../../packages/rete-1.4.4";
import ConnectionPlugin from "../../packages/connection-plugin-0.9.0"
import ReactRenderPlugin from "../../packages/react-render-plugin-0.2.1";
import AreaPlugin from "../../packages/area-plugin";

import NodeClass from '../../nodes/classes/NodeClass';
import NodeComponent from '../../nodes/classes/NodeComponent';
import MaterialNode from '../../nodes/classes/MaterialNode';

interface Props {
  dimensions: { width: number; height: number };
}

interface State {
  nodeComponents: NodeComponent[];
}

export default class GraphEditorComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();
  engine = new Rete.Engine("materialdesigner@" + ENGINE_VERSION);
  editor: NodeEditor | null = null;

  constructor(props: Props) {
    super(props)

    this.state = {
      nodeComponents: []
    };
  };


  onNodeDropped = (item: DraggableItem<NodeData>) => {
    console.log(item)
  }

  createEditor = () => {
    this.editor = new Rete.NodeEditor("materialdesigner@" + EDITOR_VERSION, this.ref.current!);

    this.editor.use(ConnectionPlugin);
    this.editor.use(ReactRenderPlugin, { component: MaterialNode });
    this.editor.use(AreaPlugin as any);
    this.editor.view.area.el.style.height = "10000000px"
    this.editor.view.area.el.style.width = "10000000px"

    this.editor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
      await this.engine.abort();
      await this.engine.process(this.editor!.toJSON());
    });
  }

  readLocalLibraryNodes = async () => {
    try {
      const data = await getAllNodes(LOCAL_NODES_PATH);
      return data;
    } catch (err) {
      //TODO:: Handle error
      console.log(err);
    }
  }

  readProjectLibraryNodes = async () => {
    try {
      const data = await getAllNodes(PROJECT_NODES_PATH());
      return data;
    } catch (err) {
      //TODO:: Handle error
      console.log(err);
    }
  }

  registerNode = (nodeData: NodeData) => {
    const component = new NodeClass(nodeData);
    const nodeComponent = new NodeComponent(component);

    let nodeComponents = [...this.state.nodeComponents, nodeComponent];

    this.setState({
      nodeComponents
    })
    this.editor?.register(nodeComponent);
  }

  readNodesAndRegister = async () => {
    const localData = await this.readLocalLibraryNodes();
    const projectData = await this.readProjectLibraryNodes();

    if (localData) {
      for (const i of localData) {
        this.registerNode(i);
      }
    }

    if (projectData) {
      for (const i of projectData) {
        this.registerNode(i);
      }
    }
  }

  componentDidMount = async () => {
    this.createEditor();

    await this.readNodesAndRegister();
    const node = await this.state.nodeComponents[0].createNode();
    const node2 = await this.state.nodeComponents[0].createNode();
    node.position = [0, 0];
    node2.position = [100, 100];
    this.editor?.addNode(node);
    this.editor?.addNode(node2);
  };

  render() {
    const { width, height } = this.props.dimensions;

    return (
      <DropFileComponent dropType={["node"]} onDropComplete={(item) => this.onNodeDropped(item)}>
        <div style={{
          backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR,
          height: "100%",
          width: "100%",
        }}>
          <div style={{ position: "absolute", width, height, top: 0 }}>
            {createGrid(defaultColors.DEFAULT_BACKGROUND_COLOR, width, height, 1.5, 10, 10)}
          </div>
          <div ref={this.ref} style={{ width, height }}></div>
        </div>
      </DropFileComponent>
    )
  }
}
