import React, { Component } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import LutMaker from "../lut_creator/LutMaker";

interface Props {
  colors: ColorLUT[];
  onChangeLut: (colors: ColorLUT[]) => void;
}

export default class Lut1 extends Component<Props> {
  onChangeColorData = (lut: ColorLUT[]) => {
    this.props.onChangeLut(lut);
  };

  render() {
    return (
      <div>
        <LutMaker
          lutType="gradient"
          onChange={this.onChangeColorData}
          onClickItem={() => {}}
          val={this.props.colors}
        />
      </div>
    );
  }
}
