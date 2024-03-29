import { Slider } from "@blueprintjs/core";
import React, { Component, createRef } from "react";
import { defaultColors } from "../../constants/Colors";
import InputNumber from "./InputNumber";

interface State {
  width: number;
}

interface Props {
  value: number;
  id: string;
  onChange: (value: number) => void;
}

export default class ColorPicker1 extends Component<Props, State> {
  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          margin: 5,
          minWidth: "250px",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            height: "30px",
            border: `2px solid ${defaultColors.IMPORTANT_BACKGROUND_COLOR}`,
            backgroundColor: `rgb(${this.props.value}, ${this.props.value}, ${this.props.value})`,
          }}
        ></div>
        <div style={{ flex: 8, paddingRight: "15px" }}>
          <Slider
            className="gcp-grayscaleslider"
            min={0}
            max={255}
            value={this.props.value}
            labelValues={[]}
            showTrackFill={false}
            onRelease={this.props.onChange}
          />
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
