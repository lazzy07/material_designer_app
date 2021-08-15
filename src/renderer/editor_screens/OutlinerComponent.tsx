import React, { Component } from "react";
import { Store } from "../../redux/reducers";
import { connect } from "react-redux";
import { Project } from "../../interfaces/Project";
import { OutlinerTypes } from "../../interfaces/OutlinerTypes";
import { setSelected } from "../../redux/actions/SystemActions";

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

interface State {}

class OutlinerComponent extends Component<Props, State> {
  componentDidMount = () => {};

  render() {
    return <div></div>;
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
