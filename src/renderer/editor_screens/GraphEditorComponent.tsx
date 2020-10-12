import React, { Component } from 'react'
import { defaultColors } from '../constants/Colors'
import { createGrid } from '../services/CreateGrid'
import DropFileComponent from '../components/library_components/DropFileComponent';
import { DraggableItem } from '../../interfaces/DraggableItem';
import { NodeData } from '../../interfaces/NodeData';
import { EDITOR_VERSION, ENGINE_VERSION } from '../constants/Versions';
import { getAllNodes } from '../services/NodeServices';
import { LOCAL_NODES_PATH, PROJECT_NODES_PATH } from '../constants/Path';

import Rete, { Node, NodeEditor } from "../../packages/rete-1.4.4";
import ConnectionPlugin from "../../packages/connection-plugin-0.9.0"
import ReactRenderPlugin from "../../packages/react-render-plugin-0.2.1";
import AreaPlugin from "../../packages/area-plugin";

import NodeClass from '../../nodes/classes/NodeClass';
import NodeComponent from '../../nodes/classes/NodeComponent';
import MaterialNode from '../../nodes/classes/MaterialNode';
import ContextMenu, { CONTEXT_MENU_TYPE } from '../components/node_editor/ContextMenu';
import { ipcRenderer } from 'electron';
import { IS_WEB } from '../services/Webguard';
import { IpcMessages } from '../../IpcMessages';
import GraphSettings from '../settings/GraphSettings';
import { Mouse } from '../../packages/rete-1.4.4/view/area';

interface Props {
  dimensions: { width: number; height: number };
}

interface State {
  nodeComponents: NodeComponent[];
  localLibNodes: NodeData[];
  localProjNodes: NodeData[];
  contextMenuType: CONTEXT_MENU_TYPE;
  selectedNode: Node | null;
}

export default class GraphEditorComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();
  engine = new Rete.Engine("materialdesigner@" + ENGINE_VERSION);
  editor: NodeEditor | null = null;
  timeOut: NodeJS.Timeout | null = null;

  mouse: Mouse = { x: 0, y: 0 };
  contextMenuPos: Mouse = { x: 0, y: 0 };

  constructor(props: Props) {
    super(props)

    this.state = {
      nodeComponents: [],
      localLibNodes: [],
      localProjNodes: [],
      contextMenuType: "editor",
      selectedNode: null
    };
  };


  onNodeDropped = (item: DraggableItem<NodeData>) => {

    //Simulate menu item click
    this.onContextMenuItemClick(item.item);
  }

  createEditor = () => {
    this.editor = new Rete.NodeEditor("materialdesigner@" + EDITOR_VERSION, this.ref.current!);

    this.editor.use(ConnectionPlugin);
    this.editor.use(ReactRenderPlugin, { component: MaterialNode });
    this.editor.use(AreaPlugin as any, { scaleExtent: { min: 0.3, max: 1.5 } });
    this.editor.view.area.el.style.height = GraphSettings.canvasSize.y + "px";
    this.editor.view.area.el.style.width = GraphSettings.canvasSize.x + "px";


    this.editor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
      await this.engine.abort();
      await this.engine.process(this.editor!.toJSON());
    });

    this.editor.on("mousemove", (mouse) => {
      this.mouse = mouse;
    })
    this.editor.view.area.el.addEventListener("drop", (e) => {
      this.contextMenuPos = { x: e.offsetX, y: e.offsetY }
    })
    this.selectContextMenuType();
  }

  selectContextMenuType = () => {
    let canPropagate = true;
    this.editor?.on("contextmenu", (e) => {
      if (e.node) {
        this.timeOut = setTimeout(() => {
          canPropagate = true;
        }, 300)
        canPropagate = false;
        this.setState({
          selectedNode: e.node,
          contextMenuType: "node"
        })
      } else {
        if (canPropagate) {
          this.setState({
            selectedNode: null,
            contextMenuType: "editor"
          })
        }
      }
    })
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
        node.position = [1000000 / 2 + 1000, 1000000 / 2 + 1000];
        node2.position = [1000000 / 2, 1000000 / 2];
        this.editor?.addNode(node);
        this.editor?.addNode(node2);

        // AreaPlugin.zoomAt(this.editor);
      })
    }
  }

  onCallContextMenu = () => {
    this.contextMenuPos = this.mouse;
  }

  onContextMenuItemClick = async (item: NodeData) => {
    for (const node of this.state.nodeComponents) {
      if (node.nodeClass.id === item.id) {
        const newNode = await node.createNode();
        console.log(this.contextMenuPos)
        newNode.position = [this.contextMenuPos.x, this.contextMenuPos.y];
        this.editor?.addNode(newNode);
      }
    }
  }

  onClickDeleteNode = (node: Node) => {
    this.editor?.removeNode(node);
  }

  onClickCopyNode = (node: Node) => {
    this.editor?.addNode(node);

  }

  // Since we forcibly open context menu the mouse values are not correct, so correct values can be found in the event
  listenToNodeMenuOpen = () => {
    window.addEventListener("openmenu", (e: any) => {
      this.contextMenuPos = e.detail.mouse;
    })
  }

  componentDidMount = async () => {
    this.createEditor();
    this.listenToNodeData();
    this.listenToNodeMenuOpen()
  };

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.editor?.view.area.el.removeEventListener("drop", () => { })
  }

  render() {
    const { width, height } = this.props.dimensions;

    return (
      <DropFileComponent dropType={["node"]} onDropComplete={(item) => this.onNodeDropped(item)}>
        <ContextMenu
          selectedNode={this.state.selectedNode}
          selectedType={this.state.contextMenuType}
          localLibraryNodes={this.state.localLibNodes}
          localProjectNodes={this.state.localProjNodes}
          onClickAction={this.onContextMenuItemClick}
          onClickDelete={this.onClickDeleteNode}
          onClickCopy={this.onClickCopyNode}
        >
          <div style={{
            backgroundColor: defaultColors.GRAPH_EDITOR_BACKGRUND_COLOR,
            height: "100%",
            width: "100%",
          }}>
            <div style={{ position: "absolute", width, height, top: 30 }}>
              {createGrid(defaultColors.GRAPH_EDITOR_GRID_COLOR, width, height, 1.5, 10, 10)}
            </div>
            <div onContextMenu={this.onCallContextMenu} ref={this.ref} style={{ width, height }}></div>
          </div>
        </ContextMenu>
      </DropFileComponent>
    )
  }
}
