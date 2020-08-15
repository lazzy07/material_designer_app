import React, { Component } from "react";
import { THUMBNAIL_TYPES } from "./LibrarySettings";

interface Props {
  src: string;
  title: string;
  thumbnailType: THUMBNAIL_TYPES;
  noBlackBackground?: boolean;
}

interface State { }

export default class ImagePreview extends Component<Props, State> {
  render() {
    if (this.props.thumbnailType !== "list") {
      return (
        <div>
          <img
            style={{
              margin: 2,
              objectFit: "contain",

              backgroundColor: this.props.noBlackBackground ? undefined : "black",
              width:
                this.props.thumbnailType === "thumblarge"
                  ? 120
                  : this.props.thumbnailType === "thumb"
                    ? 80
                    : undefined,
              height:
                this.props.thumbnailType === "thumblarge"
                  ? 120
                  : this.props.thumbnailType === "thumb"
                    ? 80
                    : undefined,
            }}
            src={this.props.src}
          ></img>
          <p
            style={{
              width: "100%",
              fontSize: 14,
              textAlign: "center",
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {this.props.title}
          </p>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              objectFit: "contain",
              width: 40,
              height: 40,
              backgroundColor: this.props.noBlackBackground ? undefined : "black",
            }}
            src={this.props.src}
          ></img>
          <p
            style={{
              width: "100%",
              paddingTop: 15,
              paddingLeft: 10,
              fontSize: 14,
            }}
          >
            {this.props.title}
          </p>
        </div>
      );
    }
  }
}
