import React from "react";
import DataNodesComponent from "../../../editor_screens/DataNodesComponent";
import ScreenComponent from "../../common/ScreenComponent";

interface Props {}

interface State {}

export default class DataNodesScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <DataNodesComponent
          dimensions={{ height: this.state.height, width: this.state.width }}
        />
      </div>
    );
  }
}
