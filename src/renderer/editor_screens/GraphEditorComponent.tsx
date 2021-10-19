import React, { Component } from "react";
import { defaultColors } from "../constants/Colors";
import { createGrid } from "../services/CreateGrid";
import DropFileComponent from "../components/library_components/DropFileComponent";
import { DraggableItem } from "../../interfaces/DraggableItem";
import ContextMenu, {
  CONTEXT_MENU_TYPE,
} from "../components/node_editor/ContextMenu";
import { Mouse } from "../../packages/rete-1.4.4/view/area";
import { CREATE_NODE_BY_DRAGGING } from "../../packages/connection-plugin-0.9.0/windowevents";
import { connect } from "react-redux";
import { Store } from "../../redux/reducers";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import DataNodeEditor from "../../graph_node_functionality/classes/node_classes/data_node_classes/DataNodeEditor";
import ShaderNodeEditor from "../../graph_node_functionality/classes/node_classes/shader_node_classes/ShaderNodeEditor";
import { Node } from "../../packages/rete-1.4.4";
import DataNodeLibrary from "../../graph_node_functionality/classes/node_classes/data_node_classes/DataNodeLibrary";
import ShaderNodeLibrary from "../../graph_node_functionality/classes/node_classes/shader_node_classes/ShaderNodeLibrary";
import NodeLibrary from "../../graph_node_functionality/classes/node_classes/common/NodeLibrary";

interface Props {
  dimensions: { width: number; height: number };
  graphType: GRAPH_TYPES | null;
  localLibShaderNodes: Graphs[];
  localLibDataNodes: Graphs[];
}

interface State {
  contextMenuType: CONTEXT_MENU_TYPE;
  selectedNode: Node | null;
}

class GraphEditorComponent extends Component<Props, State> {
  private shaderDomRef = React.createRef<HTMLDivElement>();
  private dataDomRef = React.createRef<HTMLDivElement>();

  private dataGraphEditor: DataNodeEditor | undefined;
  private shaderGraphEditor: ShaderNodeEditor | undefined;

  private dataNodeLibrary = new DataNodeLibrary();
  private shaderNodeLibrary = new ShaderNodeLibrary();

  timeOut: NodeJS.Timeout | null = null;

  createNodeByDraggingToSpace = false;
  contextMenuPos: Mouse = { x: 0, y: 0 };

  constructor(props: Props) {
    super(props);

    this.state = {
      contextMenuType: "editor",
      selectedNode: null,
    };
  }

  onNodeDropped = (item: DraggableItem<Graphs>) => {
    //Simulate menu item click
    this.onContextMenuItemClick(item.item);
  };

  selectContextMenuType = () => {
    let canPropagate = true;
    const editor =
      this.props.graphType === "shadergraph"
        ? this.shaderGraphEditor
        : this.dataGraphEditor;

    editor!.getReteEditor().on("contextmenu", (e) => {
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
    const editor =
      this.props.graphType === "shadergraph"
        ? this.shaderGraphEditor
        : this.dataGraphEditor;
    if (editor) {
      this.contextMenuPos = editor.mouse;
    }
  };

  onContextMenuItemClick = async (item: Graphs) => {
    const lib: NodeLibrary =
      this.props.graphType === "shadergraph"
        ? this.shaderNodeLibrary
        : this.dataNodeLibrary;
    const editor =
      this.props.graphType === "shadergraph"
        ? this.shaderGraphEditor
        : this.dataGraphEditor;
    for (const node of lib.getReteNodes()) {
      if (node.data.id === item.id) {
        const newNode = await node.createNode();

        newNode.position = [this.contextMenuPos.x, this.contextMenuPos.y];
        editor?.getReteEditor().addNode(newNode);

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

  initEditors = () => {
    this.dataGraphEditor = new DataNodeEditor(this.dataDomRef.current!);
    this.shaderGraphEditor = new DataNodeEditor(this.shaderDomRef.current!);

    this.dataGraphEditor.enableEditorPlugins();
    this.shaderGraphEditor.enableEditorPlugins();

    this.dataGraphEditor.handleSelectNodes();
    this.shaderGraphEditor.handleSelectNodes();

    this.dataGraphEditor.registerNodes(this.dataNodeLibrary);
    this.shaderGraphEditor.registerNodes(this.shaderNodeLibrary);
  };

  componentDidMount = async () => {
    this.listenToNodeMenuOpen();
    this.initEditors();
    this.selectContextMenuType();
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.graphType !== this.props.graphType) {
      if (!this.dataGraphEditor || !this.shaderGraphEditor) {
        this.initEditors();
      }
      this.selectContextMenuType();
    }
  }

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
              ? this.props.localLibShaderNodes
              : this.props.localLibDataNodes
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
    localLibShaderNodes: state.graphLibraries.shaderGraphNodes,
    localLibDataNodes: state.graphLibraries.dataGraphNodes,
  };
};

export default connect(mapStateToProps)(GraphEditorComponent);
