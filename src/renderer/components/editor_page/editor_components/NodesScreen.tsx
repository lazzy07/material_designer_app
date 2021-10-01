import React from "react";
import NodesComponent from "../../../editor_screens/NodesComponent";
import ScreenComponent from "../../common/ScreenComponent";

interface Props {}

interface State {}

export default class NodesScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <NodesComponent
          dimensions={{ height: this.state.height, width: this.state.width }}
        />
      </div>
    );
  }
}
