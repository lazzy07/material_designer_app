import React, { Component } from "react";
import { connect } from "react-redux";
import { ProjectSetting } from "../../interfaces/ProjectSetting";
import { Store } from "../../redux/reducers";
import "../scss/graphcomponentproperties.scss";
import { projectSettingsToElements } from "../services/ProjectSettingsToElements";

interface Props {
  width: number;
  projectSettings: ProjectSetting<any>[];
}

interface State {}

class GraphPropertiesComponent extends Component<Props, State> {
  renderProperties = () => {
    return projectSettingsToElements(this.props.projectSettings);
  };

  render() {
    return (
      <div style={{ width: this.props.width, padding: "10px 10px" }}>
        {this.renderProperties()}
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projectSettings: state.project.settings,
  };
};

export default connect(mapStateToProps)(GraphPropertiesComponent);
