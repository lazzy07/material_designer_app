import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCode,
  faFolderPlus,
  faPen,
  faPlus,
  faProjectDiagram,
  faSquareRootAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  createGraph,
  createPackage,
  injectGraph,
  injectPackage,
} from "../../services/CreateGraphs";
import { connect } from "react-redux";
import { Store } from "../../../redux/reducers";
import { changeGraphData } from "../../../redux/actions/GraphActions";
import { GraphPackage } from "../../../interfaces/GraphPackage";
import { Project } from "../../../interfaces/Project";
import { getPackage } from "../../services/GetPackageData";
import InputBox from "../form/InputBox";
import { OutlinerTypes } from "../../../interfaces/OutlinerTree";
import { Menu, MenuItem } from "react-desktop-menus";
import { ScreenMenu } from "../../services/RenderMenu";
import Menubar from "../common/MenuBar";
import { defaultColors } from "../../constants/Colors";
import { GRAPH_TYPES } from "../../../interfaces/Graphs";

interface Props {
  selectedItem: string;
  selectedType: OutlinerTypes;
  project: Project;
  selectedPackage: string;
  changeGraphData: (packages: GraphPackage[]) => void;
}

interface State {
  disabled: boolean;
  selectedName: string;
}

class OutlinerController extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      disabled: true,
      selectedName: "",
    };
  }

  addPackageToProject = () => {
    this.props.changeGraphData(
      injectPackage(this.props.project, createPackage("Untitled"))
    );
  };

  addGraphToPackage = (type: GRAPH_TYPES) => {
    const pkg = getPackage(this.props.project, this.props.selectedPackage);
    if (pkg) {
      const packages = injectGraph(
        this.props.project,
        pkg,
        createGraph("Undefined", type)
      );
      this.props.changeGraphData(packages);
    }
  };

  getSelectedItemName = () => {
    const { project } = this.props;
    const selected = this.props.selectedItem;
    if (selected === project.id) {
      this.setState({
        selectedName: project.fileName.split(".")[0],
      });
    }

    for (const pkg of project.packages) {
      if (pkg.id === selected) {
        this.setState({
          selectedName: pkg.name,
        });

        return;
      }

      for (const graph of pkg.graphs) {
        if (graph.id === selected) {
          this.setState({
            selectedName: graph.name,
          });

          return;
        }
      }
    }

    this.setState({
      selectedName: "",
    });
  };

  changeName = () => {
    let { packages } = this.props.project;

    for (let pkg of packages) {
      if (pkg.id === this.props.selectedItem) {
        pkg.name = this.state.selectedName;
        break;
      }

      for (let graph of pkg.graphs) {
        if (graph.id === this.props.selectedItem) {
          graph.name = this.state.selectedName;
          break;
        }
      }
    }

    this.props.changeGraphData(packages);
  };

  onClickEditButton = () => {
    if (!this.state.disabled) {
      //Change names
      this.changeName();
    }

    this.setState({
      disabled: !this.state.disabled,
    });
  };

  onChangeName = (val: string) => {
    this.setState({
      selectedName: val,
    });
  };

  renderAddMenu = () => {
    const disabled = !this.props.selectedPackage;
    console.log(this.props.selectedPackage);
    const addGraphMenu: ScreenMenu[] = [
      {
        label: (<FontAwesomeIcon icon={faPlus} />) as any,
        type: "menu",
        content: [
          {
            label: "Shader Graph",
            disabled,
            onClick: () => this.addGraphToPackage("shadergraph"),
            icon: (
              <FontAwesomeIcon
                icon={faProjectDiagram}
                style={{ color: defaultColors.FONT_COLOR }}
              />
            ),
            type: "item",
          },
          {
            label: "Data Graph",
            onClick: () => this.addGraphToPackage("datagraph"),
            disabled,
            icon: (
              <FontAwesomeIcon
                icon={faSquareRootAlt}
                style={{ color: defaultColors.FONT_COLOR }}
              />
            ),
            type: "item",
          },
          {
            label: "Kernel Graph",
            onClick: () => this.addGraphToPackage("kernelgraph"),
            disabled,
            icon: (
              <FontAwesomeIcon
                icon={faCode}
                style={{ color: defaultColors.FONT_COLOR }}
              />
            ),
            type: "item",
          },
        ],
      },
    ];

    return <Menubar menu={addGraphMenu} />;
  };

  openAddGrphMenu = () => {
    //this.addGraphToPackage
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.selectedItem !== this.props.selectedItem) {
      if (
        this.props.selectedType === "materialgraph" ||
        this.props.selectedType === "package"
      )
        this.setState({
          disabled: true,
        });
      this.getSelectedItemName();
    }
  };

  render() {
    return (
      <div style={{ display: "flex", paddingTop: 5, width: "100%" }}>
        <div
          style={{
            paddingTop: 2,
            paddingLeft: 10,
            // marginBottom: -12,
            fontSize: 12,
            display: "flex",
          }}
        >
          <div
            onClick={this.addPackageToProject}
            className="clickable"
            style={{ padding: 5, marginRight: 5 }}
          >
            <FontAwesomeIcon icon={faFolderPlus} />
          </div>
        </div>
        {this.renderAddMenu()}
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <div
            className="clickable"
            onClick={this.onClickEditButton}
            style={{ padding: 5, marginRight: 18, fontSize: 12 }}
          >
            <FontAwesomeIcon icon={this.state.disabled ? faPen : faCheck} />
          </div>
          <div style={{}}>
            <InputBox
              id={"input_graph"}
              value={this.state.selectedName}
              onChange={(_, val) => this.onChangeName(val)}
              disabled={this.state.disabled}
              noPadding
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    project: state.project,
    selectedPackage: state.system.selectedItems.package,
  };
};

const mapDispatchToProps = {
  changeGraphData,
};

export default connect(mapStateToProps, mapDispatchToProps)(OutlinerController);
