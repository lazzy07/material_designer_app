import React, { Component } from "react";
import DropZone from "react-dropzone";

interface Props {
  accept: string[];
  onAccept: (files: File[]) => void;
  dimensions?: { width: number; height: number };
}

interface State {}

export default class DropFiles extends Component<Props, State> {
  render() {
    return (
      <div>
        <DropZone
          accept={this.props.accept}
          onDropAccepted={files => this.props.onAccept(files)}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div
                {...getRootProps({
                  // onClick: e => e.preventDefault(),
                  className: "dropzone"
                })}
                style={{ ...this.props.dimensions }}
              >
                {this.props.children}
              </div>
            );
          }}
        </DropZone>
      </div>
    );
  }
}
