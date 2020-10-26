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
import { CREATE_NODE_BY_DRAGGING } from '../../packages/connection-plugin-0.9.0/windowevents';
import { connect } from 'react-redux';
import { Store } from '../../redux/reducers';

interface Props {
  dimensions: { width: number; height: number };
  isShadergraph: boolean;
}

interface State {
  nodeComponents: NodeComponent[];
  localLibNodes: NodeData[];
  localProjNodes: NodeData[];
  contextMenuType: CONTEXT_MENU_TYPE;
  selectedNode: Node | null;
}

class GraphEditorComponent extends Component<Props, State> {
  private shaderDomRef = React.createRef<HTMLDivElement>();
  private dataDomRef = React.createRef<HTMLDivElement>();

  engine = new Rete.Engine("materialdesigner@" + ENGINE_VERSION);
  shaderEditor: NodeEditor | null = null;
  dataGraphEditor: NodeEditor | null = null;
  timeOut: NodeJS.Timeout | null = null;

  createNodeByDraggingToSpace = false;
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

  createEditor = (ref: React.RefObject<HTMLDivElement>) => {
    const editor = new Rete.NodeEditor("materialdesigner@" + EDITOR_VERSION, ref.current!);
    editor.use(ConnectionPlugin)

    editor.use(ReactRenderPlugin, { component: MaterialNode });
    editor.use(AreaPlugin as any, { scaleExtent: { min: 0.1, max: 1.5 } });

    editor.view.area.el.style.height = GraphSettings.canvasSize.y + "px";
    editor.view.area.el.style.width = GraphSettings.canvasSize.x + "px";

    editor.view.area.el.addEventListener("drop", (e) => {
      this.contextMenuPos = { x: e.offsetX, y: e.offsetY }
    })

    return editor;
  }

  createShaderEditor = () => {
    this.shaderEditor = this.createEditor(this.shaderDomRef);

    this.shaderEditor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
      await this.engine.abort();
      await this.engine.process(this.shaderEditor!.toJSON());
    });

    this.shaderEditor.on("mousemove", (mouse) => {
      this.mouse = mouse;
    })
    this.selectContextMenuType();
  }

  createDataGraphEditor = () => {
    this.dataGraphEditor = this.createEditor(this.dataDomRef);

    this.dataGraphEditor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
      await this.engine.abort();
      await this.engine.process(this.dataGraphEditor!.toJSON());
    });

    this.dataGraphEditor.on("mousemove", (mouse) => {
      this.mouse = mouse;
    })
  }

  selectContextMenuType = () => {
    let canPropagate = true;
    this.shaderEditor?.on("contextmenu", (e) => {
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
    this.shaderEditor?.register(nodeComponent);
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
    if (!IS_WEB) {
      ipcRenderer.send(IpcMessages.GET_ALL_LOCAL_NODE_DATA);
      ipcRenderer.on(IpcMessages.RETURN_GET_ALL_LOCAL_NODE_DATA, async (_, data) => {
        this.setState({
          localLibNodes: data.library,
          localProjNodes: data.project
        })

        this.readNodesAndRegister();
        const node = await this.state.nodeComponents[0].createNode();
        const node2 = await this.state.nodeComponents[0].createNode();

        node.position = [1000000 / 2 + 500, 1000000 / 2 + 500];
        node2.position = [1000000 / 2, 1000000 / 2];
        this.shaderEditor?.addNode(node);
        this.shaderEditor?.addNode(node2);
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
        newNode.position = [this.contextMenuPos.x, this.contextMenuPos.y];
        this.shaderEditor?.addNode(newNode);

        if (this.createNodeByDraggingToSpace) {
          const event = new CustomEvent(CREATE_NODE_BY_DRAGGING, { detail: { node: newNode } });
          window.dispatchEvent(event);
          this.createNodeByDraggingToSpace = false;
        }
      }
    }
  }

  onClickDeleteNode = (node: Node) => {
    this.shaderEditor?.removeNode(node);
  }

  onClickCopyNode = (node: Node) => {
    this.shaderEditor?.addNode(node);
  }

  // Since we forcibly open context menu the mouse values are not correct, so correct values can be found in the event
  listenToNodeMenuOpen = () => {
    window.addEventListener("openmenu", (e: any) => {
      this.contextMenuPos = e.detail.mouse;
      this.createNodeByDraggingToSpace = true;
    })
  }

  componentDidMount = async () => {
    this.createShaderEditor();
    this.listenToNodeData();
    this.listenToNodeMenuOpen()
  };

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.shaderEditor?.view.area.el.removeEventListener("drop", () => { })
  }

  render() {
    const { width, height } = this.props.dimensions;
    const shaderDom = <div onContextMenu={this.onCallContextMenu} ref={this.shaderDomRef} style={{ width, height }}></div>;
    const dataDom = <div onContextMenu={this.onCallContextMenu} ref={this.dataDomRef} style={{ width, height }}></div>;

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
            {this.props.isShadergraph ? shaderDom : dataDom}
          </div>
        </ContextMenu>
      </DropFileComponent>
    )
  }
}

const mapStateToProps = (state: Store) => {
  return {
    isShadergraph: state.system.selectedItems.graphType === "shadergraph"
  }
}

export default connect(mapStateToProps)(GraphEditorComponent)