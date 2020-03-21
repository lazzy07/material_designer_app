import React, { Component } from "react";
import { getStaticPath } from "../../services/StaticAssetResolver";

interface Props {
  width: number;
  height: number;
}

export default class Loading extends Component<Props, any> {
  render() {
    return (
      <div>
        <img
          style={{ width: this.props.width, height: this.props.height }}
          src={getStaticPath("/dependencies/img/loading_svg.svg")}
          alt=""
        />
      </div>
    );
  }
}
