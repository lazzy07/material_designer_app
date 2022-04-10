import React from "react";
import { ProjectSetting } from "../../interfaces/ProjectSetting";
import InputAndSlider1 from "../components/graph_property_inputs/InputAndSlider1";
import InputAndSlider2 from "../components/graph_property_inputs/InputAndSlider2";
import Button from "../components/graph_property_inputs/Button";
import InputNumber from "../components/graph_property_inputs/InputNumber";
import InputString from "../components/graph_property_inputs/InputString";
import Slider1 from "../components/graph_property_inputs/Slider1";
import Slider2 from "../components/graph_property_inputs/Slider2";
import Lut1 from "../components/graph_property_inputs/Lut1";
import { v4 } from "uuid";
import Lut3 from "../components/graph_property_inputs/Lut3";
import ColorPicker1 from "../components/graph_property_inputs/ColorPicker1";
import ColorPicker3 from "../components/graph_property_inputs/ColorPicker3";
import { store } from "../../redux/store";
import { ColorLUT } from "../../interfaces/ColorLutData";
import Dropdown from "../components/graph_property_inputs/Dropdown";
import { Option } from "react-dropdown";
import { changeProjectSetting } from "../../redux/actions/ProjectActions";

export const projectSettingsToElements = (settings: ProjectSetting<any>[]) => {
  return settings.map((setting, index) => {
    if (setting.isHidden) {
      return <div></div>;
    }

    return (
      <div key={index}>
        <div
          style={{
            padding: "3px 10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>{setting.name}</div>
        </div>
        <div>{selectGraphElement(setting)}</div>
      </div>
    );
  });
};

const selectGraphElement = (nodeProperty: ProjectSetting<any>) => {
  const dataType = nodeProperty.dataType;
  const type = nodeProperty.inputType;

  if (dataType === "number" && type === "input") {
    return (
      <InputNumber
        value={nodeProperty.data}
        onChange={(val) => onChangeData<number>(val, nodeProperty)}
      />
    );
  } else if (dataType === "number" && type === "input_and_slider") {
    return (
      <InputAndSlider1
        onChange={(val) => onChangeData<number>(val, nodeProperty)}
        value={nodeProperty.data}
      />
    );
  } else if (dataType === "number2" && type === "input_and_slider") {
    return (
      <InputAndSlider2
        onChange={(val) => onChangeData<number[]>(val, nodeProperty)}
        value={nodeProperty.data}
      />
    );
  } else if (dataType === "boolean" && type === "button") {
    return (
      <Button
        title={nodeProperty.data === true ? "True" : "False"}
        onClick={() => onChangeData<boolean>(!nodeProperty.data, nodeProperty)}
      />
    );
  } else if (dataType === "string" && type === "input") {
    return (
      <InputString
        value={nodeProperty.data}
        onChange={(val) => onChangeData<string>(val, nodeProperty)}
      />
    );
  } else if (dataType === "number" && type === "dropdown") {
    return (
      <Dropdown
        value={nodeProperty.data.value}
        options={nodeProperty.data.options}
        onChange={(val) => onChangeDataElem(val, nodeProperty)}
      />
    );
  } else if (dataType === "number" && type === "slider") {
    return (
      <Slider1
        value={nodeProperty.data}
        onChange={(val) => onChangeData<number>(val, nodeProperty)}
      />
    );
  } else if (dataType === "number2" && type === "slider") {
    return (
      <Slider2
        value={nodeProperty.data}
        onChange={(val) => onChangeData<number[]>(val, nodeProperty)}
      />
    );
  } else if (dataType === "lut" && type === "lut") {
    return (
      <Lut1
        id={v4()}
        colors={nodeProperty.data}
        onChangeLut={(val) => onChangeData<ColorLUT[]>(val, nodeProperty)}
      />
    );
  } else if (dataType === "lut3" && type === "lut") {
    return (
      <Lut3
        id={v4()}
        colors={nodeProperty.data}
        onChangeLut={(val) => onChangeData<ColorLUT[]>(val, nodeProperty)}
      />
    );
  } else if (dataType === "colorvec" && type === "colorpicker") {
    return (
      <ColorPicker1
        value={nodeProperty.data}
        onChange={(val) => onChangeData<number>(val, nodeProperty)}
        id={v4()}
      />
    );
  } else if (dataType === "colorvec3" && type === "colorpicker") {
    return (
      <ColorPicker3
        value={nodeProperty.data}
        onChange={(val) => onChangeData<string>(val, nodeProperty)}
        id={v4()}
      />
    );
  }
  // else if (dataType === "boolean" && type === "switch") {
  //   return <Switch />;
  // }
};

function onChangeData<T>(value: T, setting: ProjectSetting<any>) {
  let i = 0;

  for (const elem of store.getState().project.settings) {
    if (elem.id === setting.id) {
      store.dispatch(changeProjectSetting<any>(value, i));
      return;
    }
    i++;
  }
}

function onChangeDataElem(value: Option, setting: ProjectSetting<any>) {
  let i = 0;

  for (const elem of store.getState().project.settings) {
    if (elem.id === setting.id) {
      store.dispatch(changeProjectSetting<any>(value.value, i, true));
      return;
    }
    i++;
  }
}
