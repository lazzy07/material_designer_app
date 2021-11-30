import { Lut3 } from "./primitive_nodes/Lut3";
import { Lut1 } from "./primitive_nodes/Lut1";
import { Graphs } from "../../../../interfaces/Graphs";
import DataGraphReference from "./DataGraphReference";
import { Button } from "./primitive_nodes/Button";
import { Number1Input } from "./primitive_nodes/Number1Input";
import { Number1InputAndSlider } from "./primitive_nodes/Number1InputAndSlider";
import { Number2InputAndSlider } from "./primitive_nodes/Number2InputAndSlider";
import { Dropdown } from "./primitive_nodes/Dropdown";
import { Slider1 } from "./primitive_nodes/Slider1";
import { Slider2 } from "./primitive_nodes/Slider2";
import { ColorPicker1 } from "./primitive_nodes/ColorPicker1";
import { ColorPicker3 } from "./primitive_nodes/ColorPicker3";
import { AddNumber } from "./primitive_nodes/AddNumber";

export const getNodeFromFactory = (nodeData: Graphs) => {
  switch (nodeData.id) {
    case "1":
      return new Number1Input(nodeData, "dataGraph");
    case "2":
      return new Number1InputAndSlider(nodeData, "dataGraph");
    case "3":
      return new Number2InputAndSlider(nodeData, "dataGraph");
    case "4":
      return new Button(nodeData, "dataGraph");
    case "6":
      return new Dropdown(nodeData, "dataGraph");
    case "8":
      return new Slider1(nodeData, "dataGraph");
    case "9":
      return new Slider2(nodeData, "dataGraph");
    case "10":
      return new Lut1(nodeData, "dataGraph");
    case "11":
      return new Lut3(nodeData, "dataGraph");
    case "12":
      return new ColorPicker1(nodeData, "dataGraph");
    case "13":
      return new ColorPicker3(nodeData, "dataGraph");
    case "14":
      return new AddNumber(nodeData, "dataGraph");
    default:
      return new DataGraphReference(nodeData, "dataGraph");
  }
};
