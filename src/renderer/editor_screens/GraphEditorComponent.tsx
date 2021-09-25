import React, { Component } from "react";
import { defaultColors } from "../constants/Colors";
import { createGrid } from "../services/CreateGrid";
import DropFileComponent from "../components/library_components/DropFileComponent";
import { DraggableItem } from "../../interfaces/DraggableItem";
import { NodeData } from "../../interfaces/NodeData";
import { ENGINE_VERSION } from "../constants/Versions";
import Rete, { Node, NodeEditor } from "../../packages/rete-1.4.4";
import NodeClass from "../../nodes/classes/NodeClass";
import NodeComponent from "../../nodes/classes/NodeComponent";
import ContextMenu, {
  CONTEXT_MENU_TYPE,
} from "../components/node_editor/ContextMenu";
import { Mouse } from "../../packages/rete-1.4.4/view/area";
import { CREATE_NODE_BY_DRAGGING } from "../../packages/connection-plugin-0.9.0/windowevents";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { GRAPH_TYPES } from "../../interfaces/Graphs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";

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

    if (!this.props.graphType) {
      return (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: 10 }}>
            <FontAwesomeIcon icon={faProjectDiagram} style={{ fontSize: 50 }} />
          </div>
          <div>
            <h4>Select a Graph from the outliner</h4>
          </div>
          <div>
            <p>(Double click on any graph to view the content)</p>
          </div>
        </div>
      );
    }

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
            <div
              onContextMenu={this.onCallContextMenu}
              ref={this.shaderDomRef}
              style={{
                width,
                height,
                display:
                  this.props.graphType === "shadergraph" ? undefined : "none",
              }}
            ></div>
            <div
              onContextMenu={this.onCallContextMenu}
              ref={this.dataDomRef}
              style={{
                width,
                height,
                display:
                  this.props.graphType === "shadergraph" ? "none" : undefined,
              }}
            ></div>
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
