import React, { Component } from "react";
import { defaultColors } from "../../constants/Colors";

export default class BottomStatus extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "27px",
          backgroundColor: defaultColors.IMPORTANT_BACKGROUND_COLOR
        }}
      ></div>
    );
  }
}
