import React, { Component } from "react";
import Button from "../components/graph_property_inputs/Button";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Switch from "../components/graph_property_inputs/Switch";
import "../scss/graphcomponentproperties.scss";

export default class GraphPropertiesComponent extends Component {
  render() {
    return (
      <div>
        <Button title="Hello Wolrd" />
        <InputNumber />
        <InputString />
        <Switch />
        <Slider1 />
        <Slider2 />
      </div>
    );
  }
}
