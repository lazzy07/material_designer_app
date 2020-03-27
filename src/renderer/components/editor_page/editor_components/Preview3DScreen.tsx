import React, { Component } from "react";
import Preview3dMenu from "./editor_dependencies/Preview3dMenu";
import ScreenComponent from "../../common/ScreenComponent";

interface Props {}

interface State {}

export default class Preview3DScreen extends ScreenComponent<Props, State> {
  componentDidMount = () => {};

  render() {
    return (
      <div
        style={{
          backgroundColor: "red",
          width: this.state.width,
          height: this.state.height
        }}
      >
        <Preview3dMenu />
      </div>
    );
  }
}
