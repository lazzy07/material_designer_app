import React, { Component } from "react";
import ScreenComponent from "../../common/ScreenComponent";
import TexturesComponent from "../../../editor_screens/TexturesComponent";

interface Props {}

interface State {}

class TexturesScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height
        }}
      >
        <TexturesComponent
          dimensions={{ height: this.state.height, width: this.state.width }}
        />
      </div>
    );
  }
}

export default TexturesScreen;
