import React, { Component } from "react";
import { ColorLUT } from "../../../interfaces/ColorLutData";
import GradientBuilder from "../../../packages/gradient-builder/GradientBuilder";
import ColorSelect from "../form/ColorSelect";

interface Props {
  id: string;
  colors: ColorLUT[];
  onChangeLut: (colors: ColorLUT[]) => void;
}

export default class Lut3 extends Component<Props> {
  WrappedColorPicker = (props) => {
    return (
      <div style={{ display: "flex", paddingTop: 15, maxWidth: 180 }}>
        <p style={{ paddingRight: 20 }}>Select Color: </p>

        <ColorSelect
          id={this.props.id}
          color={props.color}
          onChange={props.onSelect}
          noWidth
          screen="editor"
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
          width={300}
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
