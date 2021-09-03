import React, { Component } from "react";
import InputNumber from "./InputNumber";
import Slider2 from "./Slider2";

export default class InputAndSlider2 extends Component {
  render() {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: 2 }}>
          <InputNumber />
        </div>
        <div style={{ flex: 8, padding: "0 15px" }}>
          <Slider2 />
        </div>
        <div style={{ flex: 2 }}>
          <InputNumber />
        </div>
      </div>
    );
  }
}
