import React, { Component } from "react";
import InputNumber from "./InputNumber";
import Slider2 from "./Slider2";

interface Props {
  value: number[];
  onChange: (val: number[]) => void;
}

export default class InputAndSlider2 extends Component<Props> {
  render() {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: 2 }}>
          <InputNumber
            value={this.props.value[0]}
            onChange={(val) => this.props.onChange([val, this.props.value[1]])}
          />
        </div>
        <div style={{ flex: 8, padding: "0 15px" }}>
          <Slider2 value={this.props.value} onChange={this.props.onChange} />
        </div>
        <div style={{ flex: 2 }}>
          <InputNumber
            value={this.props.value[1]}
            onChange={(val) => this.props.onChange([this.props.value[0], val])}
          />
        </div>
      </div>
    );
  }
}
