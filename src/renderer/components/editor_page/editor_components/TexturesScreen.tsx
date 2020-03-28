import React, { Component } from "react";
import ScreenComponent from "../../common/ScreenComponent";
import DropZone from "react-dropzone";

interface Props {}

interface State {}

export default class TexturesScreen extends ScreenComponent<Props, State> {
  render() {
    return (
      <div>
        <DropZone
          accept={["image/jpeg", "image/png", "image/jpg"]}
          onDropAccepted={e => console.log(e)}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div
                {...getRootProps({
                  onClick: e => e.preventDefault(),
                  className: "dropzone"
                })}
              >
                <div
                  style={{ width: this.state.width, height: this.state.height }}
                ></div>
              </div>
            );
          }}
        </DropZone>
      </div>
    );
  }
}
