import React, { Component } from "react";
import { createRef } from "react";
import { ColorResult, PhotoshopPicker } from "react-color";
import ReactDOM from "react-dom";
import { ipcRenderer, remote } from "electron";
import "../scss/colorpicker.scss";
import { IpcMessages } from "../../IpcMessages";

interface Props {
  prevColor: string;
}

interface State {
  color: string;
}

export default class ColorPickerScreen extends Component<Props, State> {
  ref = createRef<PhotoshopPicker>();

  constructor(props: any) {
    super(props);

    this.state = {
      color: this.props.prevColor,
    };
  }

  componentDidMount() {
    console.log(this.props.prevColor);
    this.setState({ color: this.props.prevColor });
    const ref = ReactDOM.findDOMNode(this.ref.current);

    const child = ref?.childNodes[1].childNodes[2].childNodes[0].childNodes[1];
    const okButton = child!.childNodes[0];
    const cancelButton = child!.childNodes[1];
    const changes = child!.childNodes[2];
    child?.removeChild(okButton);
    child?.removeChild(cancelButton);

    const newOk = document.createElement("div");
    const newCancel = document.createElement("div");
    newOk.innerHTML = "OK";
    newCancel.innerHTML = "Cancel";

    newOk.classList.add("select-color-button");
    newCancel.classList.add("select-color-button");
    newOk.onclick = () => {
      ipcRenderer.send(IpcMessages.SET_COLORPICKER_DATA, {
        color: this.state.color,
      });
      const window = remote.getCurrentWindow();
      window.close();
    };

    newCancel.onclick = () => {
      const window = remote.getCurrentWindow();
      window.close();
    };

    child?.insertBefore(newOk, changes);
    child?.insertBefore(newCancel, changes);
  }

  setColor = (color: ColorResult) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div>
        <PhotoshopPicker
          ref={this.ref}
          header=""
          onChange={this.setColor}
          color={this.state.color}
          className="color-picker-custom"
        />
      </div>
    );
  }
}
