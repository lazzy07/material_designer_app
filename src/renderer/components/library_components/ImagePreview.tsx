import React, { Component } from "react";

interface Props {
  src: string;
  title: string;
}

interface State {}

export default class ImagePreview extends Component<Props, State> {
  render() {
    return (
      <div
        className="col s-6"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 300,
        }}
      >
        <img
          style={{
            objectFit: "contain",
            maxWidth: "100%",
          }}
          src={this.props.src}
        ></img>
        <p
          style={{
            width: "100%",
            textAlign: "center",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {this.props.title}
        </p>
      </div>
    );
  }
}
