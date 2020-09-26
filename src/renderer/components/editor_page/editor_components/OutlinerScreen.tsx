import React, { Component } from "react";
import OutlinerComponent from "../../../editor_screens/OutlinerComponent";
import ScreenComponent from "../../common/ScreenComponent";

interface State {

}

interface Props {

}

export default class OutlinerScreen extends ScreenComponent<Props, State> {
  render() {
    return <div>
      <OutlinerComponent dimensions={{ height: this.state.height, width: this.state.width }} />
    </div>;
  }
}
