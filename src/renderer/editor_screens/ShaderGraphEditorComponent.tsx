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
import ShaderNodeEditor from "../../graph_node_functionality/classes/node_classes/shader_node_classes/ShaderNodeEditor";
import { Node } from "../../packages/rete-1.4.4";
import ShaderNodeLibrary from "../../graph_node_functionality/classes/node_classes/shader_node_classes/ShaderNodeLibrary";
import NodeLibrary from "../../graph_node_functionality/classes/node_classes/common/NodeLibrary";
import _ from "lodash";
import { Data } from "../../packages/rete-1.4.4/core/data";
import NodeEditor from "../../graph_node_functionality/classes/node_classes/common/NodeEditor";
import { ShaderGraphNode } from "../../graph_node_functionality/classes/node_classes/shader_node_classes/primitive_nodes/ShaderGraphNode";

interface Props {
  dimensions: { width: number; height: number };
  graphType: GRAPH_TYPES | null;
  localLibShaderNodes: Graphs[];
  graph: Graphs | undefined | null;
}

interface State {
  contextMenuType: CONTEXT_MENU_TYPE;
  selectedNode: Node | null;
}

class ShaderGraphEditorComponent extends Component<Props, State> {
  private shaderDomRef = React.createRef<HTMLDivElement>();
  private shaderGraphEditor: ShaderNodeEditor | undefined;
  private shaderNodeLibrary: ShaderNodeLibrary | undefined;

  timeOut: NodeJS.Timeout | null = null;

  createNodeByDraggingToSpace = false;
  contextMenuPos: Mouse = { x: 0, y: 0 };
  mousePos: Mouse = { x: 0, y: 0 };

  constructor(props: Props) {
    super(props);

    this.state = {
      contextMenuType: "editor",
      selectedNode: null,
    };
  }

  onNodeDropped = (drop: DraggableItem<Graphs>) => {
    //Simulate menu item click
    if (drop.itemType === "shaderNode") {
      this.onContextMenuItemClick(drop.item);
    } else {
      const lib = this.shaderNodeLibrary;

      //TODO:: Create node generator and create a node from it
      const component = new ShaderGraphNode(
        drop.item,
        "shaderGraph",
        this.shaderGraphEditor!
      );
      try {
        this.shaderGraphEditor!.getReteEditor().register(component);
        this.shaderGraphEditor!.getReteEngine().register(component);
      } catch (err: any) {
        console.log(err.message);
      }

      component.createNode(drop.item).then((node) => {
        component.build(node);
        node.position = [this.mousePos.x, this.mousePos.y];
        this.shaderGraphEditor!.getReteEditor().addNode(node);
      });
    }
  };

  selectContextMenuType = () => {
    let canPropagate = true;
    const editor = this.shaderGraphEditor;
    if (editor) {
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
    }
  };

  onCallContextMenu = () => {
    const editor = this.shaderGraphEditor;
    if (editor) {
      this.contextMenuPos = editor.mouse;
    }
  };

  onContextMenuItemClick = async (item: Graphs) => {
    const lib: NodeLibrary | undefined = this.shaderNodeLibrary;
    const editor = this.shaderGraphEditor;

    if (lib)
      for (const node of lib.getReteNodes()) {
        if (node.data.id === item.id) {
          const newNode = await node.createNode();
          node.build(newNode);

          if (this.createNodeByDraggingToSpace) {
            newNode.position = [this.mousePos.x, this.mousePos.y];

            const event = new CustomEvent(CREATE_NODE_BY_DRAGGING, {
              detail: { node: newNode },
            });
            window.dispatchEvent(event);
            this.createNodeByDraggingToSpace = false;
          } else {
            newNode.position = [this.mousePos.x, this.mousePos.y];
          }

          editor?.getReteEditor().addNode(newNode);
        }
      }
  };

  onClickDeleteNode = (node: Node) => {
    this.shaderGraphEditor?.getReteEditor().removeNode(node);
  };

  onClickCopyNode = (node: Node) => {
    this.shaderGraphEditor?.getReteEditor().addNode(node);
  };

  // Since we forcibly open context menu the mouse values are not correct, so correct values can be found in the event
  listenToNodeMenuOpen = () => {
    window.addEventListener("openmenu", (e: any) => {
      this.contextMenuPos = e.detail.mouse;
      this.createNodeByDraggingToSpace = true;
    });
  };

  initEditors = () => {
    if (this.shaderDomRef.current) {
      this.shaderGraphEditor = new ShaderNodeEditor(this.shaderDomRef.current!);
      this.shaderGraphEditor.enableEditorPlugins();
      this.shaderGraphEditor.handleSelectNodes();
      this.shaderNodeLibrary = new ShaderNodeLibrary(this.shaderGraphEditor!);
      this.shaderGraphEditor.registerNodes(this.shaderNodeLibrary);
      this.shaderGraphEditor.onEditorChange();
    }
  };

  loadDataFromStore = (editor: NodeEditor) => {
    //Load Data from store
    if (editor) {
      if (this.props.graph && this.props.graphType) {
        const graphElem = this.props.graph[this.props.graphType!];
        if (graphElem) {
          if (!_.isEmpty(graphElem.data)) {
            editor.getReteEditor().clear();
            editor.loadFromStore(graphElem.data as Data);
          } else {
            console.log("editor cleared");
            editor.getReteEditor().clear();
          }
        }
      }
    }
  };

  onMouseMove = (e: MouseEvent) => {
    const canvas = this.shaderGraphEditor?.getReteEditor().view.area;

    const pos = canvas?.getMousePos();
    this.mousePos.x = pos ? pos.x : 0;
    this.mousePos.y = pos ? pos.y : 0;
  };

  startMousePointerListner = () => {
    this.shaderGraphEditor
      ?.getReteEditor()
      .view.area.el.addEventListener("mousemove", this.onMouseMove);
  };

  removeMousePointerListener = () => {
    this.shaderGraphEditor
      ?.getReteEditor()
      .view.area.el.removeEventListener("mousemove", this.onMouseMove);
  };

  componentDidMount = async () => {
    this.listenToNodeMenuOpen();
    this.initEditors();
    this.selectContextMenuType();
    this.loadDataFromStore(this.shaderGraphEditor!);
    this.startMousePointerListner();
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.graph) {
      if (!this.shaderGraphEditor) {
        this.initEditors();
      }

      this.selectContextMenuType();

      if (this.props.graph.id != (prevProps.graph ? prevProps.graph.id : "")) {
        if (this.shaderGraphEditor) {
          this.shaderGraphEditor!.getReteEditor().clear();
          this.shaderGraphEditor!.getReteEditor().fromJSON(
            this.props.graph.shaderGraph!.data as Data
          );
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.shaderGraphEditor
      ?.getReteEditor()
      .view.area.el.removeEventListener("drop", () => {});

    this.removeMousePointerListener();
  }

  render() {
    const { width, height } = this.props.dimensions;

    return (
      <div>
        <div
          style={{
            height: height,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            display:
              !this.props.graphType || this.props.graphType === "dataGraph"
                ? "flex"
                : "none",
          }}
        >
          <div style={{ padding: 10 }}>
            <FontAwesomeIcon icon={faProjectDiagram} style={{ fontSize: 50 }} />
          </div>
          <div>
            <h4>Select a Shader/Kernel Graph from the outliner</h4>
          </div>
          <div>
            <p>(Double click on any graph to view the content)</p>
          </div>
        </div>
        <div
          style={{
            display:
              !this.props.graphType || this.props.graphType === "dataGraph"
                ? "none"
                : undefined,
          }}
        >
          <DropFileComponent
            dropType={["shaderNode", "shaderGraph"]}
            onDropComplete={(item) => this.onNodeDropped(item)}
          >
            <ContextMenu
              selectedNode={this.state.selectedNode}
              selectedType={this.state.contextMenuType}
              localLibraryNodes={this.props.localLibShaderNodes}
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
                      this.props.graphType !== "dataGraph" ? undefined : "none",
                  }}
                ></div>
              </div>
            </ContextMenu>
          </DropFileComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  const graph = state.project.packages[
    state.system.selectedItems.graphId
  ] as Graphs;
  const graphType = graph ? graph.type : null;

  return {
    graph,
    graphType,
    localLibShaderNodes: state.graphLibraries.shaderGraphNodes,
  };
};

export default connect(mapStateToProps)(ShaderGraphEditorComponent);
