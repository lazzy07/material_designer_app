import React, { Component } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import { defaultColors } from "../../constants/Colors";

type LUTType = "gradient" | "constant";

interface Props {
  val: ColorLUT[];
  onChange: (colorLut: ColorLUT[]) => void;
  onClickItem?: (index: number, color: string) => void;
  onDoubleClickItem?: (index: number, color: string) => void;
  lutType: LUTType;
}

interface State {
  selected: number;
}

export default class LutMaker extends Component<Props, State> {
  renderHandle = () => {
    return (
      <div>
        <div
          style={{
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            transform: "translate(-50%, 0)",
            position: "absolute",
            top: -18,
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: "45px",
            width: "3px",
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: 15,
            width: 15,
            position: "relative",
            transform: "rotate(45deg) translate(-15%, 45%)",
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
        <div
          style={{
            height: 20,
            width: 20,
            position: "relative",
            transform: "translate(-45%, -25%)",
            backgroundColor: defaultColors.HOVER_COLOR,
          }}
        ></div>
      </div>
    );
  };

  renderHandles = () => {
    return this.renderHandle();
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          minWidth: "200px",
          position: "relative",
          margin: 15,
          marginTop: 50,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "45px",
            backgroundColor: "red",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {this.renderHandles()}
          </div>
        </div>
      </div>
    );
  }
}
