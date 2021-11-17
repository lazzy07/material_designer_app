import React, { Component } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import GradientBuilder from "../../../packages/gradient-builder/GradientBuilder";
import { hexToRgb, rgbToHex } from "../../services/ColorConverter";
import ColorSelect from "../form/ColorSelect";
import ColorPicker1 from "./ColorPicker1";

interface Props {
  id: string;
  colors: ColorLUT[];
  onChangeLut: (colors: ColorLUT[]) => void;
}

export default class Lut1 extends Component<Props> {
  WrappedColorPicker = (props) => {
    const col = hexToRgb(props.color);
    const val = col ? col.r : 0;

    return (
      <div style={{ paddingTop: 15 }}>
        <div>Select Color: </div>
        <ColorPicker1
          id={this.props.id}
          value={val}
          onChange={(val) => props.onSelect(rgbToHex(val, val, val))}
        />
      </div>
    );
  };

  onChangeColorData = (lut: ColorLUT[]) => {
    this.props.onChangeLut(lut);
  };

  render() {
    return (
      <div style={{ padding: "20px 10px" }}>
        <GradientBuilder
          height={32}
          width={300}
          drop={50}
          palette={this.props.colors}
          onPaletteChange={this.props.onChangeLut}
        >
          <this.WrappedColorPicker />
        </GradientBuilder>
      </div>
    );
  }
}
