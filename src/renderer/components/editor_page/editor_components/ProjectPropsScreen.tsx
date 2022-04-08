import React, { Component } from "react";
import ProjectPropertiesComponent from "../../../editor_screens/ProjectPropertiesComponent";
import ScreenComponent from "../../common/ScreenComponent";

export default class ProjectPropsScreen extends ScreenComponent {
  render() {
    return (
      <div>
        <ProjectPropertiesComponent width={this.state.width} />
      </div>
    );
  }
}
