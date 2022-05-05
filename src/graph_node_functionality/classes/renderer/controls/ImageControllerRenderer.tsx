import React, { Component } from "react";

interface Props {
  id: string;
  emitter: string;
  name: string;
  node: Node;
  data: {
    img: string;
  };
}

export default class ImageControllerRenderer extends Component<Props> {
  render() {
    return (
      <div
        style={{
          width: "180px",
          height: "180px",
        }}
      >
        <canvas id={this.props.id} height={"180px"} width={"180px"} />
      </div>
    );
  }
}
