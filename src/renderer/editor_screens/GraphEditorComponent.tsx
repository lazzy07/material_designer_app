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
import ContextMenu from '../components/node_editor/ContextMenu';
import { ipcRenderer } from 'electron';
import { IS_WEB } from '../services/Webguard';
import { IpcMessages } from '../../IpcMessages';

interface Props {
  dimensions: { width: number; height: number };
}

interface State {
  nodeComponents: NodeComponent[];
  localLibNodes: NodeData[];
  localProjNodes: NodeData[];
}

export default class GraphEditorComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();
  engine = new Rete.Engine("materialdesigner@" + ENGINE_VERSION);
  editor: NodeEditor | null = null;

  constructor(props: Props) {
    super(props)

    this.state = {
      nodeComponents: [],
      localLibNodes: [],
      localProjNodes: []
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
    this.editor.view.area.el.style.height = "1000000000px"
    this.editor.view.area.el.style.width = "1000000000px"

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
    const localData = this.state.localLibNodes;
    const projectData = this.state.localProjNodes;

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

  listenToNodeData = () => {
    ipcRenderer.send(IpcMessages.GET_ALL_LOCAL_NODE_DATA);

    if (!IS_WEB) {
      ipcRenderer.on(IpcMessages.RETURN_GET_ALL_LOCAL_NODE_DATA, async (_, data) => {
        this.setState({
          localLibNodes: data.library,
          localProjNodes: data.project
        })

        this.readNodesAndRegister();

        const node = await this.state.nodeComponents[0].createNode();
        const node2 = await this.state.nodeComponents[0].createNode();
        node.position = [0, 0];
        node2.position = [100, 100];
        this.editor?.addNode(node);
        this.editor?.addNode(node2);
      })
    }
  }

  componentDidMount = async () => {
    this.createEditor();
    this.listenToNodeData();
  };

  render() {
    const { width, height } = this.props.dimensions;

    return (
      <DropFileComponent dropType={["node"]} onDropComplete={(item) => this.onNodeDropped(item)}>
        <ContextMenu
          localLibraryNodes={this.state.localLibNodes}
          localProjectNodes={this.state.localProjNodes}
        >
          <div style={{
            backgroundColor: defaultColors.GRAPH_EDITOR_BACKGRUND_COLOR,
            height: "100%",
            width: "100%",
          }}>
            <div style={{ position: "absolute", width, height, top: 30 }}>
              {createGrid(defaultColors.GRAPH_EDITOR_GRID_COLOR, width, height, 1.5, 10, 10)}
            </div>
            <div ref={this.ref} style={{ width, height }}></div>
          </div>
        </ContextMenu>
      </DropFileComponent>
    )
  }
}
