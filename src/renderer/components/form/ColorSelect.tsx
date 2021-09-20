import React, { Component } from "react";
import { ipcRenderer } from "electron";
import { IS_WEB } from "../../services/Webguard";
import { IpcMessages } from "../../../IpcMessages";
import { SCREEN_TYPE } from "../../../interfaces/ScreenType";
import { defaultColors } from "../../constants/Colors";

interface Props {
  id: string;
  screen: SCREEN_TYPE;
  title?: string;
  color: string;
  onChange: (val: string) => void;
  noWidth?: boolean;
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

  listner = (e: any, data: { color: string }) => {
    this.props.onChange(data.color);
  };

  componentDidMount() {
    ipcRenderer.on("color_picker" + this.props.id, this.listner);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("color_picker" + this.props.id, this.listner);
  }

  render() {
    return (
      <div style={{ display: "flex", marginTop: 5, marginBottom: 5 }}>
        <div style={{ minWidth: this.props.noWidth ? 0 : 180 }}>
          {this.props.title}
        </div>
        <div
          onClick={this.openColorPicker}
          style={{
            border: "1px solid " + defaultColors.FONT_COLOR,
            width: 40,
            height: 20,
            backgroundColor: this.props.color,
            marginLeft: 20,
            cursor: "pointer",
          }}
        ></div>
      </div>
    );
  }
}
