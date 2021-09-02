import React, { Component } from "react";
import Button from "../components/graph_property_inputs/Button";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import "../scss/graphcomponentproperties.scss";

export default class GraphPropertiesComponent extends Component {
  render() {
    return (
      <div>
        <Button title="Hello Wolrd" />
        <InputNumber />
        <InputString />
      </div>
    );
  }
}