import React, { Component } from "react";
import { THUMBNAIL_TYPES } from "./LibrarySettings";
import "../../scss/imagepreview.scss"
import DraggableComponent from "./DraggableComponent";

interface Props {
  src: string;
  title: string;
  thumbnailType: THUMBNAIL_TYPES;
  hdriType?: boolean;
  noBlackBackground?: boolean;
}

interface State { }

export default class ImagePreview extends Component<Props, State> {
  onDragStart = () => {

  }

  render() {
    if (this.props.thumbnailType !== "list") {
      return (
        <DraggableComponent onDragStart={this.onDragStart}>
          <div style={{ cursor: "pointer" }}>
            <img
              draggable={false}
              style={{
                margin: 2,
                objectFit: "contain",
                backgroundColor: this.props.noBlackBackground ? undefined : "black",
                width:
                  this.props.thumbnailType === "thumblarge"
                    ? this.props.hdriType ? 250 : 120
                    : this.props.thumbnailType === "thumb"
                      ? this.props.hdriType ? 120 : 80
                      : undefined,
                height:
                  this.props.thumbnailType === "thumblarge"
                    ? this.props.hdriType ? 120 : 120
                    : this.props.thumbnailType === "thumb"
                      ? this.props.hdriType ? 55 : 80
                      : undefined,
              }}
              src={this.props.src}
            ></img>
            <p
              style={{
                width: "100%",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {this.props.title}
            </p>
          </div>
        </DraggableComponent>
      );
    } else {
      return (
        <DraggableComponent onDragStart={this.onDragStart}>
          <div className="imagePreview" style={{ display: "flex", alignItems: "center", cursor: "poinnter" }}>
            <img
              style={{
                objectFit: "contain",
                width: this.props.hdriType ? 60 : 40,
                height: 40,
                backgroundColor: this.props.noBlackBackground ? undefined : "black",
              }}
              src={this.props.src}
            ></img>
            <div style={{ width: "100%", height: 40, paddingLeft: 10, }}>
              <p
                style={{
                  width: "100%",
                  paddingTop: 7,
                  paddingBottom: 7,
                  fontSize: 14,
                }}
              >
                {this.props.title}
              </p>
            </div>
          </div>
        </DraggableComponent>
      );
    }
  }
}
