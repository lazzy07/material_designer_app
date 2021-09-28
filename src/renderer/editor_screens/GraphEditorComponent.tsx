import React, { Component } from "react";
import { defaultColors } from "../constants/Colors";
import { createGrid } from "../services/CreateGrid";
import DropFileComponent from "../components/library_components/DropFileComponent";
import { DraggableItem } from "../../interfaces/DraggableItem";
import { NodeData } from "../../interfaces/NodeData";
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
import DataNodeEditor from "../../graph_node_functionality/classes/node_classes/data_node_classes/DataNodeEditor";
import ShaderNodeEditor from "../../graph_node_functionality/classes/node_classes/shader_node_classes/ShaderNodeEditor";
import { Node } from "../../packages/rete-1.4.4";

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

  private dataGraphEditor: DataNodeEditor | undefined;
  private shaderGraphEditor: ShaderNodeEditor | undefined;

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
    this.shaderGraphEditor?.getReteEditor().on("contextmenu", (e) => {
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

  onCallContextMenu = () => {
    this.contextMenuPos = this.mouse;
  };

  onContextMenuItemClick = async (item: NodeData) => {
    for (const node of this.state.nodeComponents) {
      if (node.nodeClass.id === item.id) {
        const newNode = await node.createNode();
        newNode.position = [this.contextMenuPos.x, this.contextMenuPos.y];
        this.shaderGraphEditor?.getReteEditor().addNode(newNode);

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
    if (this.props.graphType === "shadergraph") {
      this.shaderGraphEditor?.getReteEditor().removeNode(node);
    } else {
      this.dataGraphEditor?.getReteEditor().removeNode(node);
    }
  };

  onClickCopyNode = (node: Node) => {
    if (this.props.graphType === "shadergraph") {
      this.shaderGraphEditor?.getReteEditor().addNode(node);
    } else {
      this.shaderGraphEditor?.getReteEditor().addNode(node);
    }
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
    this.shaderGraphEditor
      ?.getReteEditor()
      .view.area.el.removeEventListener("drop", () => {});
    this.dataGraphEditor
      ?.getReteEditor()
      .view.area.el.removeEventListener("drop", () => {});
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
