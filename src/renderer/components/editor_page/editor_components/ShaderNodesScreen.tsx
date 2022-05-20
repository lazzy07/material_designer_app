import React from "react";
import ShaderNodesComponent from "../../../editor_screens/ShaderNodesComponent";
import ScreenComponent from "../../common/ScreenComponent";

interface Props {}

interface State {}

export default class NodesScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <ShaderNodesComponent
          dimensions={{ height: this.state.height, width: this.state.width }}
        />
      </div>
    );
  }
}
