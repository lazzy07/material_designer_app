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
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

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
}

class OutlinerComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: [],
    };
  }

  projectToOutliner = () => {
    const packages = this.props.project.packages;
    let outliner: TreeNodeInfo[] = [
      {
        id: this.props.project.id,
        label: this.props.project.fileName,
        isExpanded: this.state.expanded.includes(this.props.project.id),
        hasCaret: true,
        icon: <FontAwesomeIcon icon={faArchive} style={{ marginRight: 10 }} />,
        childNodes: [],
      },
    ];

    let projectChilds = outliner[0].childNodes;

    //loop through packages
    for (const pkg of packages) {
      let pkgOutlinerElem = {
        id: pkg.id,
        label: pkg.name,
        isExpanded: this.state.expanded.includes(pkg.id),
        isSelected: this.props.selectedPackage === pkg.id,
        hasCaret: true,
        icon: <FontAwesomeIcon icon={faFolder} style={{ marginRight: 10 }} />,
        childNodes: [],
      };

      if (pkgOutlinerElem.isExpanded) {
        pkgOutlinerElem.icon = (
          <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: 10 }} />
        );
      }

      projectChilds!.push(pkgOutlinerElem);

      let pkgChilds = projectChilds![projectChilds!.length - 1];
      //loop through graphs
      for (const graph of pkg.children) {
      }
    }
    return outliner;
  };

  handleNodeClick = (node: TreeNodeInfo) => {};

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
    console.log(node);
  };

  render() {
    return (
      <div>
        <Tree
          onNodeExpand={this.handleNodeExapnd}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeClick={this.handleNodeClick}
          contents={this.projectToOutliner()}
          onNodeContextMenu={this.handleNodeRightClick}
        />
      </div>
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
