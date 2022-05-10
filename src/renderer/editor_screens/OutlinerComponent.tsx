import React, { Component } from "react";
import { Store } from "../../redux/reducers";
import { connect } from "react-redux";
import { Project } from "../../interfaces/Project";
import { OutlinerTypes } from "../../interfaces/OutlinerTypes";
import { setSelected } from "../../redux/actions/SystemActions";
import { TreeNodeInfo, Tree, EditableText } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCode,
  faEye,
  faFolder,
  faFolderOpen,
  faPen,
  faProjectDiagram,
  faSquareRootAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  PackageElement,
  PackageTreeElement,
} from "../../interfaces/PackageElement";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { ScreenMenu } from "../services/RenderMenu";
import OutlinerContextMenu from "../components/outliner/OutlinerContextMenu";
import { defaultColors } from "../constants/Colors";
import { getPackageElementById } from "../services/GetPackageElement";
import { createRef } from "react";
import {
  addNewGraph,
  addNewPackage,
  createGraph,
  createPackage,
  deletePackage,
  editPackageName,
  getPackageElement,
} from "../services/ProjectPackageManagement";
import { showDialogBox } from "../services/QuestionDialog";
import { ipcRenderer } from "electron";
import { IpcMessages } from "../../IpcMessages";

interface Props {
  dimensions: { width: number; height: number };
  project: Project;
  selectedGraph: Graphs | null;
  selectedGraphType: GRAPH_TYPES | null;
  packages: { [id: string]: PackageElement };
  tree: PackageTreeElement[];
  setSelected: (graphType: GRAPH_TYPES, graph: Graphs) => void;
}

interface State {
  expanded: string[];
  rightClicked: string | null;
  clicked: string | null;
  edit: string | null;
  name: string; //edit package graph name
}

class OutlinerComponent extends Component<Props, State> {
  ref = createRef<OutlinerContextMenu>();

  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: [],
      rightClicked: null,
      clicked: null,
      edit: null,
      name: "",
    };
  }

  closeMenu = () => {
    this.ref.current!.closeMenu();
  };

  addPackage = () => {
    const rightClicked = this.state.rightClicked;
    if (rightClicked) {
      const elem = getPackageElementById(rightClicked);
      if (elem) {
        addNewPackage(
          rightClicked,
          createPackage(),
          elem.contentType === "project"
        );
        if (!this.state.expanded.includes(rightClicked)) {
          const expanded = this.state.expanded;
          expanded.push(rightClicked);
          this.setState({ expanded });
        }
      }
    }

    this.closeMenu();
  };

  addGraph = (graphType: GRAPH_TYPES) => {
    const rightClicked = this.state.rightClicked;
    if (rightClicked) {
      const elem = getPackageElementById(rightClicked);
      if (elem) {
        addNewGraph(
          rightClicked,
          createGraph(graphType),
          elem.contentType === "project"
        );
        if (!this.state.expanded.includes(rightClicked)) {
          const expanded = this.state.expanded;
          expanded.push(rightClicked);
          this.setState({ expanded });
        }
      }
    }
    ipcRenderer.send(IpcMessages.UPDATE_PROJECT);
    this.closeMenu();
  };

  removePackage = async (type: string) => {
    {
      const rightClicked = this.state.rightClicked;
      this.closeMenu();

      if (rightClicked) {
        const elem = getPackageElementById(rightClicked);
        if (elem) {
          const val = await showDialogBox(
            {
              message: `Are you sure you want to delete this ${type}?`,
              type: "warning",
              buttons: ["Delete", "Cancel"],
              title: "Are you sure?",
            },
            true
          );

          if (val.response === 0) {
            deletePackage(rightClicked);
            ipcRenderer.send(IpcMessages.UPDATE_PROJECT);
          }
        }
      }
    }
  };

  onClickRename = () => {
    this.closeMenu();
    const rightClicked = this.state.rightClicked;

    if (rightClicked) {
      const elem = getPackageElementById(rightClicked);
      if (elem) {
        this.setState({ edit: elem.data!.id, name: elem.data?.name! });
      }
    }
  };

  onCancelEditing = () => {
    this.setState({ edit: null, name: "" });
  };

  onConfirmEditing = () => {
    const elem = getPackageElementById(this.state.edit!);
    if (elem && this.state.name.length > 0) {
      editPackageName(this.state.edit!, this.state.name);
    }
    this.setState({ edit: null, name: "" });
  };

  onChangeName = (value: string) => {
    this.setState({ name: value });
  };

  renderOutlinerLabel = (name: string, id: string, type: OutlinerTypes) => {
    const elem = getPackageElementById(id);
    return this.state.edit === id ? (
      <div>
        <EditableText
          maxLength={50}
          confirmOnEnterKey
          selectAllOnFocus
          isEditing
          value={this.state.name}
          onChange={this.onChangeName}
          onCancel={this.onCancelEditing}
          onConfirm={this.onConfirmEditing}
        />
      </div>
    ) : (
      <div>
        {name}{" "}
        {this.props.selectedGraph &&
          this.props.selectedGraph.id === elem?.data?.id &&
          this.props.selectedGraphType === type && (
            <FontAwesomeIcon style={{ marginLeft: 20 }} icon={faEye} />
          )}
      </div>
    );
  };

  getContextMenu = (): ScreenMenu[] => {
    if (this.state.rightClicked) {
      const elem = getPackageElementById(this.state.rightClicked);
      if (elem) {
        if (elem.contentType === "project") {
          return [
            {
              type: "menu",
              label: "context",
              content: [
                {
                  label: "Add Package",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faFolder}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: this.addPackage,
                },
                {
                  label: "Create Shader Graph",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faProjectDiagram}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.addGraph("shaderGraph"),
                },
                {
                  label: "Create Data Graph",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faSquareRootAlt}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.addGraph("dataGraph"),
                },
                {
                  label: "Create Kernel Graph",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faCode}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.addGraph("kernelGraph"),
                },
              ],
            },
          ];
        } else if (elem.contentType === "package") {
          return [
            {
              type: "menu",
              label: "context",
              content: [
                {
                  label: "Add Package",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faFolder}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: this.addPackage,
                },
                {
                  label: "Create Shader Graph",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faProjectDiagram}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.addGraph("shaderGraph"),
                },
                {
                  label: "Create Data Graph",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faSquareRootAlt}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.addGraph("dataGraph"),
                },
                {
                  label: "Create Kernel Graph",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faCode}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.addGraph("kernelGraph"),
                },
                {
                  label: "Rename",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: this.onClickRename,
                },
                {
                  label: "Remove",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.removePackage("package"),
                },
              ],
            },
          ];
        } else {
          return [
            {
              type: "menu",
              label: "context",
              content: [
                {
                  label: "Rename",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: this.onClickRename,
                },
                {
                  label: "Remove",
                  type: "item",
                  icon: (
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: defaultColors.FONT_COLOR }}
                    />
                  ),
                  onClick: () => this.removePackage("graph"),
                },
              ],
            },
          ];
        }
      }
    }
    return [];
  };

  outlinerRecursive = (packages: PackageTreeElement[]) => {
    let treeData: TreeNodeInfo<{}>[] = [];
    for (const i of packages) {
      let pkg = this.props.packages[i.id];
      if (pkg) {
        if (pkg.contentType === "package") {
          let pkgOutlinerElem: TreeNodeInfo = {
            id: pkg.id,
            label: this.renderOutlinerLabel(pkg.name, pkg.id, "package"),
            isExpanded: this.state.expanded.includes(pkg.id),
            isSelected: this.state.clicked === pkg.id,
            hasCaret: true,
            icon: (
              <FontAwesomeIcon icon={faFolder} style={{ marginRight: 10 }} />
            ),
            childNodes: [],
          };

          if (pkgOutlinerElem.isExpanded) {
            pkgOutlinerElem.icon = (
              <FontAwesomeIcon
                icon={faFolderOpen}
                style={{ marginRight: 10 }}
              />
            );
          }

          pkgOutlinerElem.childNodes = this.outlinerRecursive(i.children);

          treeData!.push(pkgOutlinerElem);
        } else {
          const graph = pkg as unknown as Graphs;
          let graphOutlinerElem: TreeNodeInfo = {
            id: graph.id,
            label: this.renderOutlinerLabel(graph.name, graph.id, "project"),
            isExpanded: this.state.expanded.includes(graph.id),
            isSelected: this.state.clicked === graph.id,
            hasCaret: true,
            childNodes: [],
          };

          switch (graph.type) {
            case "shaderGraph":
              graphOutlinerElem.icon = (
                <FontAwesomeIcon
                  icon={faProjectDiagram}
                  style={{ marginRight: 10 }}
                />
              );
              graphOutlinerElem.id = graph.shaderGraph!.id;
              graphOutlinerElem.isSelected =
                this.state.clicked === graph.shaderGraph!.id;
              graphOutlinerElem.isExpanded = this.state.expanded.includes(
                graph.shaderGraph!.id
              );
              graphOutlinerElem.childNodes = [
                {
                  id: graph.dataGraph!.id,
                  label: this.renderOutlinerLabel(
                    "Data Graph",
                    graph.dataGraph!.id,
                    "dataGraph"
                  ),
                  isSelected: this.state.clicked === graph.dataGraph!.id,
                  icon: (
                    <FontAwesomeIcon
                      icon={faSquareRootAlt}
                      style={{ marginRight: 10 }}
                    />
                  ),
                },
              ];
              graphOutlinerElem.label = this.renderOutlinerLabel(
                graph.name,
                graph.id,
                "shaderGraph"
              );
              break;

            case "kernelGraph":
              graphOutlinerElem.icon = (
                <FontAwesomeIcon icon={faCode} style={{ marginRight: 10 }} />
              );
              graphOutlinerElem.id = graph.kernelGraph!.id;
              graphOutlinerElem.isSelected =
                this.state.clicked === graph.kernelGraph!.id;
              graphOutlinerElem.isExpanded = this.state.expanded.includes(
                graph.kernelGraph!.id
              );

              graphOutlinerElem.childNodes = [
                {
                  id: graph.dataGraph!.id,
                  label: this.renderOutlinerLabel(
                    "Data Graph",
                    graph.dataGraph!.id,
                    "dataGraph"
                  ),
                  icon: (
                    <FontAwesomeIcon
                      icon={faSquareRootAlt}
                      style={{ marginRight: 10 }}
                    />
                  ),
                  isSelected: this.state.clicked === graph.dataGraph!.id,
                },
                {
                  id: graph.shaderGraph!.id,
                  label: this.renderOutlinerLabel(
                    "Shader Graph",
                    graph.shaderGraph!.id,
                    "shaderGraph"
                  ),
                  icon: (
                    <FontAwesomeIcon
                      icon={faProjectDiagram}
                      style={{ marginRight: 10 }}
                    />
                  ),
                  isSelected: this.state.clicked === graph.shaderGraph!.id,
                },
              ];
              graphOutlinerElem.label = this.renderOutlinerLabel(
                graph.name,
                graph.id,
                "kernelGraph"
              );
              break;

            case "dataGraph":
              graphOutlinerElem.icon = (
                <FontAwesomeIcon
                  icon={faSquareRootAlt}
                  style={{ marginRight: 10 }}
                />
              );
              graphOutlinerElem.hasCaret = false;
              graphOutlinerElem.id = graph.dataGraph!.id;
              graphOutlinerElem.isSelected =
                this.state.clicked === graph.dataGraph!.id;
              graphOutlinerElem.label = this.renderOutlinerLabel(
                graph.name,
                graph.id,
                "dataGraph"
              );

              break;
          }

          treeData.push(graphOutlinerElem);
        }
      }
    }
    return treeData;
  };

  packagesObjectToPackageTree = () => {};

  projectToOutliner = () => {
    const packages = this.props.project.packages;
    let outliner: TreeNodeInfo[] = [
      {
        id: this.props.project.id,
        label: this.props.project.fileName,
        isExpanded: true,
        isSelected: this.state.clicked === this.props.project.id,
        hasCaret: true,
        icon: <FontAwesomeIcon icon={faArchive} style={{ marginRight: 10 }} />,
        childNodes: [],
      },
    ];

    outliner[0].childNodes = this.outlinerRecursive(this.props.tree);
    return outliner;
  };

  handleNodeClick = (node: TreeNodeInfo) => {
    this.setState({ clicked: node.id as string });
  };

  handleNodeExapnd = (node: TreeNodeInfo) => {
    const expanded = [...this.state.expanded];
    expanded.push(node.id as string);
    this.setState({ expanded });
  };

  handleNodeCollapse = (node: TreeNodeInfo) => {
    const expanded = [...this.state.expanded];
    const index = expanded.indexOf(node.id as string);
    if (index > -1) {
      expanded.splice(index, 1);
    }

    this.setState({ expanded });
  };

  handleNodeRightClick = (
    node: TreeNodeInfo,
    nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    this.setState({
      rightClicked: node.id as string,
      clicked: node.id as string,
    });
  };

  handleNodeDoubleClick = (node: TreeNodeInfo) => {
    const id = node.id;

    const elem = getPackageElementById(id as string);

    if (elem) {
      if (elem.contentType === "package") {
        this.setState({ edit: id as string, name: elem.data?.name! });
      } else if (elem.contentType === "graph") {
        const graph = elem.data as Graphs;
        let type: GRAPH_TYPES;
        if (graph.dataGraph!.id === id) {
          type = "dataGraph";
        } else if (graph.kernelGraph?.id === id) {
          type = "kernelGraph";
        } else {
          type = "shaderGraph";
        }

        if (this.props.selectedGraph) {
          //saveGraph(this.props.selectedGraph.id, this.props.selectedGraph);
        }
        this.props.setSelected(type, elem.data! as Graphs);

        ipcRenderer.send(IpcMessages.SELECT_CURRENT_GRAPH, {
          id: elem.data!.id,
          type,
        });
      }
    }
  };

  render() {
    return (
      <OutlinerContextMenu ref={this.ref} contextMenu={this.getContextMenu()}>
        <div>
          <Tree
            onNodeExpand={this.handleNodeExapnd}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeClick={this.handleNodeClick}
            onNodeDoubleClick={this.handleNodeDoubleClick}
            contents={this.projectToOutliner()}
            onNodeContextMenu={this.handleNodeRightClick}
          />
        </div>
      </OutlinerContextMenu>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    project: state.project,
    selectedGraph: state.system.selectedItems.graph,
    selectedGraphType: state.system.selectedItems.graphType,
    packages: state.project.packages,
    tree: state.project.tree,
  };
};

const mapDispatchToProps = {
  setSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(OutlinerComponent);
