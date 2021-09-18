import React, { Component } from "react";
import Button from "../components/graph_property_inputs/Button";
import InputAndSlider1 from "../components/graph_property_inputs/InputAndSlider1";
import InputAndSlider2 from "../components/graph_property_inputs/InputAndSlider2";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Switch from "../components/graph_property_inputs/Switch";
import ColorPicker3 from "../components/graph_property_inputs/ColorPicker3";
import ColorPicker1 from "../components/graph_property_inputs/ColorPicker1";
import "../scss/graphcomponentproperties.scss";
import Lut1 from "../components/graph_property_inputs/Lut1";
import { ColorLUT } from "../../interfaces/ColorLutData";

interface State {
  colors: ColorLUT[];
}

export default class GraphPropertiesComponent extends Component<any, State> {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
    };
  }

  render() {
    return (
      <div>
        {/* <Button title="Hello Wolrd" />
        <InputNumber />
        <InputString />
        <Switch />
        <Slider1 />
        <Slider2 />
        <InputAndSlider1 />
        <InputAndSlider2 />
        <ColorPicker3 id="hel" /> */}
        <ColorPicker1 value={128} id="val" />
        <Lut1
          colors={this.state.colors}
          onChangeLut={(lut) => this.setState({ colors: lut })}
        />
      </div>
    );
  }
}
