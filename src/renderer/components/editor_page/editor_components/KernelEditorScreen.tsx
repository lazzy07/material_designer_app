import React from "react";
import KernelEditorComponent from "../../../editor_screens/KernelEditorComponent";
import ScreenComponent from "../../common/ScreenComponent";

export default class KernelEditorScreen extends ScreenComponent {
  render() {
    return (
      <div>
        <KernelEditorComponent
          height={this.state.height}
          width={this.state.width}
        />
      </div>
    );
  }
}
