import React, { Component } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import GradientBuilder from "../../../packages/gradient-builder/GradientBuilder";
import ColorPicker3 from "./ColorPicker3";

interface Props {
  id: string;
  colors: ColorLUT[];
  onChangeLut: (colors: ColorLUT[]) => void;
}

export default class Lut1 extends Component<Props> {
  WrappedColorPicker = (props) => {
    return (
      <div>
        <ColorPicker3
          id={this.props.id}
          onChange={props.onSelect}
          value={props.color}
        />
      </div>
    );
  };

  onChangeColorData = (lut: ColorLUT[]) => {
    this.props.onChangeLut(lut);
  };

  onDoubleClick = (id: number, defColor: string) => {
    console.log(id, defColor);
  };

  render() {
    return (
      <div style={{ padding: "20px 10px" }}>
        <GradientBuilder
          height={32}
          width={400}
          drop={50}
          onDoubleClick={this.onDoubleClick}
          palette={this.props.colors}
          onPaletteChange={this.props.onChangeLut}
        >
          <this.WrappedColorPicker />
        </GradientBuilder>
      </div>
    );
  }
}
