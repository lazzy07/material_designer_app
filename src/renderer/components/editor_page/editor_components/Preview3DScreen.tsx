import React, { Component } from "react";
import Preview3dMenu from "./editor_dependencies/preview_3d/Preview3dMenu";
import ScreenComponent from "../../common/ScreenComponent";
import Preview3dComponent from "../../../editor_screens/Preview3dComponent";

interface Props { }

interface State { }

export default class Preview3DScreen extends ScreenComponent<Props, State> {
  componentDidMount = () => { };

  render() {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height
        }}
      >
        <Preview3dMenu />
        <Preview3dComponent />
      </div>
    );
  }
}
