import React, { Component } from "react";
import ScreenComponent from "../../common/ScreenComponent";
import HdrisComponent from "../../../editor_screens/HdrisComponent";

interface Props {}

interface State {}

export default class HdrisScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height
        }}
      >
        <HdrisComponent
          dimensions={{ height: this.state.height, width: this.state.width }}
        />
      </div>
    );
  }
}
