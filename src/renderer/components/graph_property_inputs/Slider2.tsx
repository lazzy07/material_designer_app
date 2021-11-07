import { RangeSlider } from "@blueprintjs/core";
import React, { Component } from "react";

interface Props {
  value: number[];
  onChange: (val: number[]) => void;
}

export default class Slider2 extends Component<Props> {
  render() {
    return (
      <div>
        <RangeSlider
          className="gcp-slider2"
          value={[this.props.value[0], this.props.value[1]]}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
