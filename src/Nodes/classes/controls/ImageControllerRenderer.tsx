import React, { Component } from "react";

export default class ImageControllerRenderer extends Component<any, any> {
  componentDidMount = () => {};

  render() {
    return (
      <div>
        <img alt="" src={"https://picsum.photos/1200"} width="180px" />
      </div>
    );
  }
}
