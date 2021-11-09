import React, { Component } from "react";
import InputNumber from "./InputNumber";
import Slider1 from "./Slider1";

interface Props {
  value: number;
  onChange: (val: number) => void;
}

export default class InputAndSlider1 extends Component<Props> {
  render() {
    return (
      <div style={{ display: "flex", width: "100%", margin: 5 }}>
        <div style={{ flex: 9, paddingRight: "15px" }}>
          <Slider1 value={this.props.value} onChange={this.props.onChange} />
        </div>
        <div style={{ flex: 3 }}>
          <InputNumber
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
