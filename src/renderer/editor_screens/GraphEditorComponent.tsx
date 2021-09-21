import React, { Component } from "react";
import { defaultColors } from "../constants/Colors";
import { createGrid } from "../services/CreateGrid";
import DropFileComponent from "../components/library_components/DropFileComponent";
import { DraggableItem } from "../../interfaces/DraggableItem";
import { NodeData } from "../../interfaces/NodeData";
import { EDITOR_VERSION, ENGINE_VERSION } from "../constants/Versions";
import Rete, { Node, NodeEditor } from "../../packages/rete-1.4.4";
import ConnectionPlugin from "../../packages/connection-plugin-0.9.0";
import ReactRenderPlugin from "../../packages/react-render-plugin-0.2.1";
import AreaPlugin from "../../packages/area-plugin";
import NodeClass from "../../nodes/classes/NodeClass";
import NodeComponent from "../../nodes/classes/NodeComponent";
import MaterialNode from "../../nodes/classes/MaterialNode";
import ContextMenu, {
  CONTEXT_MENU_TYPE,
} from "../components/node_editor/ContextMenu";
import { ipcRenderer } from "electron";
import { IS_WEB } from "../services/Webguard";
import { IpcMessages } from "../../IpcMessages";
import { Mouse } from "../../packages/rete-1.4.4/view/area";
import { CREATE_NODE_BY_DRAGGING } from "../../packages/connection-plugin-0.9.0/windowevents";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { store } from "../../redux/store";
import { GRAPH_TYPES } from "../../interfaces/Graphs";

interface Props {
  dimensions: { width: number; height: number };
  graphType: GRAPH_TYPES | null;
}

interface State {
  nodeComponents: NodeComponent[];
  localLibShaderNodes: NodeData[];
  localLibDataNodes: NodeData[];
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
    super(props);

    this.state = {
      nodeComponents: [],
      localLibShaderNodes: [],
      localLibDataNodes: [],
      contextMenuType: "editor",
      selectedNode: null,
    };
  }

  onNodeDropped = (item: DraggableItem<NodeData>) => {
    //Simulate menu item click
    this.onContextMenuItemClick(item.item);
  };

  createEditor = (ref: React.RefObject<HTMLDivElement>) => {
    const editor = new Rete.NodeEditor(
      "materialdesigner@" + EDITOR_VERSION,
      ref.current!
    );
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin, { component: MaterialNode });
    editor.use(AreaPlugin as any, { scaleExtent: { min: 0.1, max: 1.5 } });

    editor.view.area.el.style.height =
      store.getState().preferences.graphSettings.canvasSize.y + "px";
    editor.view.area.el.style.width =
      store.getState().preferences.graphSettings.canvasSize.x + "px";

    editor.view.area.el.addEventListener("drop", (e) => {
      this.contextMenuPos = { x: e.offsetX, y: e.offsetY };
    });

    return editor;
  };

  createShaderEditor = () => {
    this.shaderEditor = this.createEditor(this.shaderDomRef);

    this.shaderEditor.on(
      [
        "process",
        "nodecreated",
        "noderemoved",
        "connectioncreated",
        "connectionremoved",
      ],
      async () => {
        await this.engine.abort();
        await this.engine.process(this.shaderEditor!.toJSON());
      }
    );

    this.shaderEditor.on("mousemove", (mouse) => {
      this.mouse = mouse;
    });
    this.selectContextMenuType();
  };

  createDataGraphEditor = () => {
    this.dataGraphEditor = this.createEditor(this.dataDomRef);

    this.dataGraphEditor.on(
      [
        "process",
        "nodecreated",
        "noderemoved",
        "connectioncreated",
        "connectionremoved",
      ],
      async () => {
        await this.engine.abort();
        await this.engine.process(this.dataGraphEditor!.toJSON());
      }
    );

    this.dataGraphEditor.on("mousemove", (mouse) => {
      this.mouse = mouse;
    });
  };

  selectContextMenuType = () => {
    let canPropagate = true;
    this.shaderEditor?.on("contextmenu", (e) => {
      if (e.node) {
        this.timeOut = setTimeout(() => {
          canPropagate = true;
        }, 300);
        canPropagate = false;
        this.setState({
          selectedNode: e.node,
          contextMenuType: "node",
        });
      } else {
        if (canPropagate) {
          this.setState({
            selectedNode: null,
            contextMenuType: "editor",
          });
        }
      }
    });
  };

  registerNode = (nodeData: NodeData) => {
    const component = new NodeClass(nodeData);
    const nodeComponent = new NodeComponent(component);

    let nodeComponents = [...this.state.nodeComponents, nodeComponent];

    this.setState({
      nodeComponents,
    });
    if (nodeData.graphType === "shadergraph") {
      this.shaderEditor?.register(nodeComponent);
    } else if (nodeData.graphType === "datagraph") {
      this.dataGraphEditor?.register(nodeComponent);
    }
  };

  registerNodes = (data: NodeData[]) => {
    if (data) {
      for (const i of data) {
        this.registerNode(i);
      }
    }
  };

  readNodesAndRegister = async () => {
    const localShaderNodes = this.state.localLibShaderNodes;
    const localDataNodes = this.state.localLibDataNodes;

    this.registerNodes(localShaderNodes);
    this.registerNodes(localDataNodes);
  };

  listenToNodeData = () => {
    if (!IS_WEB) {
      ipcRenderer.send(IpcMessages.GET_ALL_LOCAL_NODE_DATA);
      ipcRenderer.on(
        IpcMessages.RETURN_GET_ALL_LOCAL_NODE_DATA,
        async (_, data) => {
          let libraryShaderNodes: NodeData[] = [];
          let libraryDataNodes: NodeData[] = [];
          let projectShaderNodes: NodeData[] = [];
          let projectDataNodes: NodeData[] = [];

          if (data.library) {
            for (const i of data.library) {
              if (i.graphType === "shadergraph") {
                libraryShaderNodes.push(i);
              } else {
                libraryDataNodes.push(i);
              }
            }
          }
          if (data.projct) {
            for (const i of data.project) {
              if (i.graphType === "shadergraph") {
                projectShaderNodes.push(i);
              } else {
                projectShaderNodes.push(i);
              }
            }
          }
          this.setState({
            localLibShaderNodes: libraryShaderNodes,
            localLibDataNodes: libraryDataNodes,
          });

          this.readNodesAndRegister();
          const node = await this.state.nodeComponents[0].createNode();
          const node2 = await this.state.nodeComponents[0].createNode();

          node.position = [1000000 / 2 + 500, 1000000 / 2 + 500];
          node2.position = [1000000 / 2, 1000000 / 2];
          this.shaderEditor?.addNode(node);
          this.shaderEditor?.addNode(node2);
        }
      );
    }
  };

  onCallContextMenu = () => {
    this.contextMenuPos = this.mouse;
  };

  onContextMenuItemClick = async (item: NodeData) => {
    for (const node of this.state.nodeComponents) {
      if (node.nodeClass.id === item.id) {
        const newNode = await node.createNode();
        newNode.position = [this.contextMenuPos.x, this.contextMenuPos.y];
        this.shaderEditor?.addNode(newNode);

        if (this.createNodeByDraggingToSpace) {
          const event = new CustomEvent(CREATE_NODE_BY_DRAGGING, {
            detail: { node: newNode },
          });
          window.dispatchEvent(event);
          this.createNodeByDraggingToSpace = false;
        }
      }
    }
  };

  onClickDeleteNode = (node: Node) => {
    this.shaderEditor?.removeNode(node);
  };

  onClickCopyNode = (node: Node) => {
    this.shaderEditor?.addNode(node);
  };

  // Since we forcibly open context menu the mouse values are not correct, so correct values can be found in the event
  listenToNodeMenuOpen = () => {
    window.addEventListener("openmenu", (e: any) => {
      this.contextMenuPos = e.detail.mouse;
      this.createNodeByDraggingToSpace = true;
    });
  };

  componentDidMount = async () => {
    this.createShaderEditor();
    this.listenToNodeData();
    this.listenToNodeMenuOpen();
  };

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.shaderEditor?.view.area.el.removeEventListener("drop", () => {});
    this.dataGraphEditor?.view.area.el.removeEventListener("drop", () => {});
  }

  render() {
    const { width, height } = this.props.dimensions;
    const shaderDom = (
      <div
        onContextMenu={this.onCallContextMenu}
        ref={this.shaderDomRef}
        style={{ width, height }}
      ></div>
    );
    const dataDom = (
      <div
        onContextMenu={this.onCallContextMenu}
        ref={this.dataDomRef}
        style={{ width, height }}
      ></div>
    );

    return (
      <DropFileComponent
        dropType={["node"]}
        onDropComplete={(item) => this.onNodeDropped(item)}
      >
        <ContextMenu
          selectedNode={this.state.selectedNode}
          selectedType={this.state.contextMenuType}
          localLibraryNodes={
            this.props.graphType === "shadergraph"
              ? this.state.localLibShaderNodes
              : this.state.localLibDataNodes
          }
          onClickAction={this.onContextMenuItemClick}
          onClickDelete={this.onClickDeleteNode}
          onClickCopy={this.onClickCopyNode}
        >
          <div
            style={{
              backgroundColor: defaultColors.GRAPH_EDITOR_BACKGRUND_COLOR,
              height: "100%",
              width: "100%",
            }}
          >
            <div style={{ position: "absolute", width, height, top: 30 }}>
              {createGrid(
                defaultColors.GRAPH_EDITOR_GRID_COLOR,
                width,
                height,
                1.5,
                10,
                10
              )}
            </div>
            {this.props.graphType === "shadergraph" ? shaderDom : dataDom}
          </div>
        </ContextMenu>
      </DropFileComponent>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    graphType: state.system.selectedItems.graphType,
  };
};

export default connect(mapStateToProps)(GraphEditorComponent);
