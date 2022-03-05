import React, { Component } from "react";
import CompilerOutputComponent from "../../../editor_screens/CompilerOutputComponent";
import ScreenComponent from "../../common/ScreenComponent";

export default class CompilerOutputScreen extends ScreenComponent {
  render() {
    return (
      <div style={{ height: this.state.height, width: this.state.width }}>
        <CompilerOutputComponent
          height={this.state.height}
          width={this.state.width}
        />
      </div>
    );
  }
}
