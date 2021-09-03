import { RangeSlider } from "@blueprintjs/core";
import React, { Component } from "react";

export default class Slider2 extends Component {
  render() {
    return (
      <div>
        <RangeSlider className="gcp-slider2" value={[3, 7]} />
      </div>
    );
  }
}
