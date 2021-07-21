import React, { Component } from "react";
import { ipcRenderer } from "electron";
import { IS_WEB } from "../../services/Webguard";
import { IpcMessages } from "../../../IpcMessages";
import { SCREEN_TYPE } from "../../../interfaces/ScreenType";

interface Props {
  id: string;
  screen: SCREEN_TYPE;
  title?: string;
  color: string;
  onChange: (val: string) => void;
}

export default class ColorSelect extends Component<Props> {
  openColorPicker = () => {
    if (IS_WEB) {
      //TODO:: Add web functionality
    } else {
      ipcRenderer.send(IpcMessages.OPEN_COLORPICKER, {
        id: this.props.id,
        window: this.props.screen,
        color: this.props.color,
      });
    }
  };

  render() {
    return (
      <div style={{ display: "flex", marginTop: 5, marginBottom: 5 }}>
        <div>{this.props.title}</div>
        <div
          onClick={this.openColorPicker}
          style={{
            width: 40,
            height: 20,
            backgroundColor: this.props.color,
            marginLeft: 20,
          }}
        ></div>
      </div>
    );
  }
}
