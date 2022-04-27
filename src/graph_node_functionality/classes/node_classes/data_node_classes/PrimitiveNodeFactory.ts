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
import { SubstractNumber } from "./primitive_nodes/SubstractNumber";
import { MultiplyNumber } from "./primitive_nodes/MultiplyNumber";
import { DivideNumber } from "./primitive_nodes/DivideNumber";
import { PowerNumber } from "./primitive_nodes/PowerNumber";
import { SquarerootNumber } from "./primitive_nodes/SquarerootNumber";
import { Col1toNum1 } from "./primitive_nodes/Col1toNum1";
import { Num1toCol1 } from "./primitive_nodes/Num1toCol1";
import { Col3toNum1 } from "./primitive_nodes/Col3toNum1";
import { Num1toCol3 } from "./primitive_nodes/Num1toCol3";
import { BooltoNum1 } from "./primitive_nodes/BooltoNum1";
import { Num1toBool } from "./primitive_nodes/Num1toBool";
import { Num1toNum2 } from "./primitive_nodes/Num1toNum2";
import { Num2toNum1 } from "./primitive_nodes/Num2toNum1";
import { OutputNum1 } from "./primitive_nodes/OutputNum1";
import { OutputNum2 } from "./primitive_nodes/OutputNum2";
import { OutputCol1 } from "./primitive_nodes/OutputCol1";
import { OutputCol3 } from "./primitive_nodes/OutputCol3";
import { OutputBool } from "./primitive_nodes/OutputBool";
import { OutputLut1 } from "./primitive_nodes/OutputLut1";
import { OutputLut3 } from "./primitive_nodes/OutputLut3";
import { NodePropertyData } from "../../../interfaces/NodePropertyData";
import { v4 } from "uuid";

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
    case "15":
      return new SubstractNumber(nodeData, "dataGraph");
    case "16":
      return new MultiplyNumber(nodeData, "dataGraph");
    case "17":
      return new DivideNumber(nodeData, "dataGraph");
    case "18":
      return new PowerNumber(nodeData, "dataGraph");
    case "19":
      return new SquarerootNumber(nodeData, "dataGraph");
    case "20":
      return new Col1toNum1(nodeData, "dataGraph");
    case "21":
      return new Num1toCol1(nodeData, "dataGraph");
    case "22":
      return new Col3toNum1(nodeData, "dataGraph");
    case "23":
      return new Num1toCol3(nodeData, "dataGraph");
    case "24":
      return new BooltoNum1(nodeData, "dataGraph");
    case "25":
      return new Num1toBool(nodeData, "dataGraph");
    case "26":
      return new Num1toNum2(nodeData, "dataGraph");
    case "27":
      return new Num2toNum1(nodeData, "dataGraph");
    case "28":
      return new OutputNum1(nodeData, "dataGraph");
    case "29":
      return new OutputNum2(nodeData, "dataGraph");
    case "30":
      return new OutputCol1(nodeData, "dataGraph");
    case "31":
      return new OutputCol3(nodeData, "dataGraph");
    case "32":
      return new OutputBool(nodeData, "dataGraph");
    case "33":
      return new OutputLut1(nodeData, "dataGraph");
    case "34":
      return new OutputLut3(nodeData, "dataGraph");
    default:
      return new DataGraphReference(nodeData, "dataGraph");
  }
};
