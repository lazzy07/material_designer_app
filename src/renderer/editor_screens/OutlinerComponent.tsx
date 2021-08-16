import React, { Component } from "react";
import { Store } from "../../redux/reducers";
import { connect } from "react-redux";
import { Project } from "../../interfaces/Project";
import { OutlinerTypes } from "../../interfaces/OutlinerTypes";
import { setSelected } from "../../redux/actions/SystemActions";
import { TreeNodeInfo, Tree } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCode,
  faFolder,
  faFolderOpen,
  faPen,
  faProjectDiagram,
  faSquareRootAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { PackageElement } from "../../interfaces/PackageElement";
import { Graphs } from "../../interfaces/Graphs";
import { ScreenMenu } from "../services/RenderMenu";
import OutlinerContextMenu from "../components/outliner/OutlinerContextMenu";
import { defaultColors } from "../constants/Colors";
import { getPackageElementById } from "../services/GetPackageElement";

interface Props {
  dimensions: { width: number; height: number };
  project: Project;
  selectedPackage: string;
  selectedGraph: string;
  selectedGraphType: OutlinerTypes;
  setSelected: (
    type: "graph" | "package",
    graphType: OutlinerTypes,
    id: string
  ) => void;
}

interface State {
  expanded: string[];
  rightClicked: string | null;
  clicked: string | null;
}

class OutlinerComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: [],
      rightClicked: null,
      clicked: null,
    };
  }

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
                },
              ],
            },
          ];
        }
      }
    }
    return [];
  };

  outlinerRecursive = (packages: PackageElement[]) => {
    let treeData: TreeNodeInfo<{}>[] = [];
    for (const pkg of packages) {
      if (pkg.contentType === "package") {
        let pkgOutlinerElem: TreeNodeInfo = {
          id: pkg.id,
          label: pkg.name,
          isExpanded: this.state.expanded.includes(pkg.id),
          isSelected: this.state.clicked === pkg.id,
          hasCaret: true,
          icon: <FontAwesomeIcon icon={faFolder} style={{ marginRight: 10 }} />,
          childNodes: [],
        };

        if (pkgOutlinerElem.isExpanded) {
          pkgOutlinerElem.icon = (
            <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: 10 }} />
          );
        }

        pkgOutlinerElem.childNodes = this.outlinerRecursive(pkg.children);

        treeData!.push(pkgOutlinerElem);
      } else {
        const graph = pkg as Graphs;
        let graphOutlinerElem: TreeNodeInfo = {
          id: graph.id,
          label: graph.name,
          isExpanded: this.state.expanded.includes(graph.id),
          isSelected: this.state.clicked === graph.id,
          hasCaret: true,
          childNodes: [],
        };

        switch (graph.type) {
          case "shadergraph":
            graphOutlinerElem.icon = (
              <FontAwesomeIcon icon={faProjectDiagram} />
            );
            graphOutlinerElem.id = graph.shaderGraph!.id;
            graphOutlinerElem.isSelected =
              this.state.clicked === graph.shaderGraph!.id;
            graphOutlinerElem.childNodes = [
              {
                id: graph.dataGraph!.id,
                label: "Data Graph",
                icon: <FontAwesomeIcon icon={faSquareRootAlt} />,
              },
            ];

          case "kernelgraph":
            graphOutlinerElem.icon = <FontAwesomeIcon icon={faCode} />;
            graphOutlinerElem.id = graph.kernelGraph!.id;
            graphOutlinerElem.isSelected =
              this.state.clicked === graph.kernelGraph!.id;
            graphOutlinerElem.childNodes = [
              {
                id: graph.dataGraph!.id,
                label: "Data Graph",
                icon: <FontAwesomeIcon icon={faSquareRootAlt} />,
              },
            ];
          case "datagraph":
            graphOutlinerElem.icon = <FontAwesomeIcon icon={faSquareRootAlt} />;
            graphOutlinerElem.hasCaret = false;
            graphOutlinerElem.id = graph.dataGraph!.id;
            graphOutlinerElem.isSelected =
              this.state.clicked === graph.dataGraph!.id;
        }

        treeData.push(graphOutlinerElem);
      }
    }

    return treeData;
  };

  projectToOutliner = () => {
    const packages = this.props.project.packages;
    let outliner: TreeNodeInfo[] = [
      {
        id: this.props.project.id,
        label: this.props.project.fileName,
        isExpanded: this.state.expanded.includes(this.props.project.id),
        isSelected: this.state.clicked === this.props.project.id,
        hasCaret: true,
        icon: <FontAwesomeIcon icon={faArchive} style={{ marginRight: 10 }} />,
        childNodes: [],
      },
    ];

    outliner[0].childNodes = this.outlinerRecursive(packages);
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

  render() {
    return (
      <OutlinerContextMenu contextMenu={this.getContextMenu()}>
        <div>
          <Tree
            onNodeExpand={this.handleNodeExapnd}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeClick={this.handleNodeClick}
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
    selectedPackage: state.system.selectedItems.package,
    selectedGraph: state.system.selectedItems.graph,
    selectedGraphType: state.system.selectedItems.graphType,
  };
};

const mapDispatchToProps = {
  setSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(OutlinerComponent);
