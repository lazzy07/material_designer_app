import React, { Component } from "react";
import { defaultColors } from "../constants/Colors";
import { createGrid, createGrid2 } from "../services/CreateGrid";
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
import { Node } from "../../packages/rete-1.4.4";
import DataNodeLibrary from "../../graph_node_functionality/classes/node_classes/data_node_classes/DataNodeLibrary";
import NodeLibrary from "../../graph_node_functionality/classes/node_classes/common/NodeLibrary";
import _ from "lodash";
import { Data } from "../../packages/rete-1.4.4/core/data";
import NodeEditor from "../../graph_node_functionality/classes/node_classes/common/NodeEditor";

interface Props {
  dimensions: { width: number; height: number };
  graphType: GRAPH_TYPES | null;
  localLibDataNodes: Graphs[];
  graph: Graphs | undefined | null;
}

interface State {
  contextMenuType: CONTEXT_MENU_TYPE;
  selectedNode: Node | null;
}

class DataGraphEditorComponent extends Component<Props, State> {
  private dataDomRef = React.createRef<HTMLDivElement>();
  private dataGraphEditor: DataNodeEditor | undefined;
  private dataNodeLibrary = new DataNodeLibrary();

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
    const editor = this.dataGraphEditor;

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
    const editor = this.dataGraphEditor;

    if (editor) {
      this.contextMenuPos = editor.mouse;
    }
  };

  onContextMenuItemClick = async (item: Graphs) => {
    const lib: NodeLibrary | undefined = this.dataNodeLibrary;
    const editor = this.dataGraphEditor;

    if (lib)
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
    this.dataGraphEditor?.getReteEditor().removeNode(node);
  };

  onClickCopyNode = (node: Node) => {
    this.dataGraphEditor?.getReteEditor().addNode(node);
  };

  // Since we forcibly open context menu the mouse values are not correct, so correct values can be found in the event
  listenToNodeMenuOpen = () => {
    window.addEventListener("openmenu", (e: any) => {
      this.contextMenuPos = e.detail.mouse;
      this.createNodeByDraggingToSpace = true;
    });
  };

  initEditors = () => {
    if (this.dataDomRef.current) {
      this.dataGraphEditor = new DataNodeEditor(this.dataDomRef.current!);
      this.dataGraphEditor.enableEditorPlugins();
      this.dataGraphEditor.handleSelectNodes();
      this.dataGraphEditor.registerNodes(this.dataNodeLibrary);
      this.dataGraphEditor.onEditorChange();
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

  componentDidMount = async () => {
    this.listenToNodeMenuOpen();
    this.initEditors();
    this.selectContextMenuType();
    this.loadDataFromStore(this.dataGraphEditor!);
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.graph) {
      if (!this.dataGraphEditor) {
        this.initEditors();
      }

      this.selectContextMenuType();

      if (this.props.graph.id != (prevProps.graph ? prevProps.graph.id : "")) {
        if (this.dataGraphEditor) {
          this.dataGraphEditor!.getReteEditor().clear();
          this.dataGraphEditor!.getReteEditor().fromJSON(
            this.props.graph.dataGraph!.data as Data
          );
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }

    this.dataGraphEditor
      ?.getReteEditor()
      .view.area.el.removeEventListener("drop", () => {});
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
            display: this.props.graphType ? "none" : "flex",
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
        <div
          style={{
            display: this.props.graphType ? undefined : "none",
          }}
        >
          <DropFileComponent
            dropType={["node"]}
            onDropComplete={(item) => this.onNodeDropped(item)}
          >
            <ContextMenu
              selectedNode={this.state.selectedNode}
              selectedType={this.state.contextMenuType}
              localLibraryNodes={this.props.localLibDataNodes}
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
                  {createGrid2(
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
                  ref={this.dataDomRef}
                  style={{
                    width,
                    height,
                    display: this.props.graphType ? undefined : "none",
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
    localLibDataNodes: state.graphLibraries.dataGraphNodes,
  };
};

export default connect(mapStateToProps)(DataGraphEditorComponent);
