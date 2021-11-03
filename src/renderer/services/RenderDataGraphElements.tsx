import React from "react";
import { NodePropertyData } from "../../graph_node_functionality/interfaces/NodePropertyData";
import InputAndSlider1 from "../components/graph_property_inputs/InputAndSlider1";
import InputAndSlider2 from "../components/graph_property_inputs/InputAndSlider2";
import Button from "../components/graph_property_inputs/Button";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Dropdown from "../components/graph_property_inputs/Dropdown";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Lut1 from "../components/graph_property_inputs/Lut1";
import { v4 } from "uuid";
import Lut3 from "../components/graph_property_inputs/Lut3";
import ColorPicker1 from "../components/graph_property_inputs/ColorPicker1";
import ColorPicker3 from "../components/graph_property_inputs/ColorPicker3";
import Switch from "../components/graph_property_inputs/Switch";

export const renderDatagraphElement = (
  nodeProperty: NodePropertyData<any>,
  index: number
) => {
  return (
    <div>
      <div
        key={index}
        style={{
          padding: "3px 10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{nodeProperty.name}</div>
      </div>
      <div>{selectGraphElement(nodeProperty)}</div>
    </div>
  );
};

const selectGraphElement = (nodeProperty: NodePropertyData<any>) => {
  const dataType = nodeProperty.dataType;
  const type = nodeProperty.inputType;
  if (dataType === "number" && type === "input") {
    return <InputNumber value={nodeProperty.data} onChange={() => {}} />;
  } else if (dataType === "number" && type === "input_and_slider") {
    return <InputAndSlider1 onChange={() => {}} value={nodeProperty.data} />;
  } else if (dataType === "number2" && type === "input_and_slider") {
    return <InputAndSlider2 onChange={() => {}} value={nodeProperty.data} />;
  } else if (dataType === "boolean" && type === "button") {
    return (
      <Button
        title={nodeProperty.data === true ? "True" : "False"}
        onClick={() => {}}
      />
    );
  } else if (dataType === "string" && type === "input") {
    return <InputString value={nodeProperty.data} onChange={() => {}} />;
  } else if (dataType === "number" && type === "dropdown") {
    return <Dropdown />;
  } else if (dataType === "number" && type === "slider") {
    return <Slider1 />;
  } else if (dataType === "number2" && type === "slider") {
    return <Slider2 />;
  } else if (dataType === "lut" && type === "lut") {
    return <Lut1 id={v4()} colors={nodeProperty.data} onChangeLut={() => {}} />;
  } else if (dataType === "lut3" && type === "lut") {
    return <Lut3 id={v4()} colors={nodeProperty.data} onChangeLut={() => {}} />;
  } else if (dataType === "colorvec" && type === "colorpicker") {
    return (
      <ColorPicker1 value={nodeProperty.data} onChange={() => {}} id={v4()} />
    );
  } else if (dataType === "colorvec3" && type === "colorpicker") {
    return (
      <ColorPicker3 value={nodeProperty.data} onChange={() => {}} id={v4()} />
    );
  } else if (dataType === "boolean" && type === "switch") {
    return <Switch />;
  }
};
