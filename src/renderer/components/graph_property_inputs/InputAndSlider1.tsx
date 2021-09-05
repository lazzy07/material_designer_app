import React, { Component } from "react";
import InputNumber from "./InputNumber";
import Slider1 from "./Slider1";

export default class InputAndSlider1 extends Component {
  render() {
    return (
      <div style={{ display: "flex", width: "100%", margin: 5 }}>
        <div style={{ flex: 9, paddingRight: "15px" }}>
          <Slider1 />
        </div>
        <div style={{ flex: 3 }}>
          <InputNumber />
        </div>
      </div>
    );
  }
}
