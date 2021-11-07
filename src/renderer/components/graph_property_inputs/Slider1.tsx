import { Slider } from "@blueprintjs/core";
import React, { Component } from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
}

export default class Slider1 extends Component<Props> {
  render() {
    return (
      <div>
        <Slider
          className="gcp-slider1"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
