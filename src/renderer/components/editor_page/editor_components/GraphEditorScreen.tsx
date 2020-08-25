import React, { Component } from "react";
import { IS_WEB } from "../../../services/Webguard";
import ScreenComponent from "../../common/ScreenComponent";

interface Props {

}

interface State {

}

export default class GraphEditorScreen extends ScreenComponent<Props, State> {
  render() {
    return <div style={{ width: this.state.width, height: this.state.height }} className="dropper">Graph Editor screen</div>;
  }
}
