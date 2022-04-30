import { Number1Input } from "./01_Number1Input";
import { Number1InputAndSlider } from "./02_Number1InputAndSlider";
import { Number2InputAndSlider } from "./03_Number2InputAndSlider";
import { Button } from "./04_Button";
import { Slider1 } from "./08_Slider1";
import { Slider2 } from "./09_Slider2";
import { Lut1 } from "./10_Lut1";
import { Lut3 } from "./11_Lut3";
import { ColorPicker1 } from "./12_ColorPicker1";
import { ColorPicker3 } from "./13_ColorPicker3";
import { AddNumber } from "./14_AddNumber";
import { SubstractNumber } from "./15_SubstractNumber";
import { MultiplyNumber } from "./16_MultiplyNumber";
import { DivideNumber } from "./17_DivideNumber";
import { PowerNumber } from "./18_PowerNumber";
import { SquarerootNumber } from "./19_SquarerootNumber";
import { Col1toNum1 } from "./20_Col1toNum1";
import { Num1toCol1 } from "./21_Num1toCol1";
import { Col3toNum1 } from "./22_Col3toNum1";
import { Num1toCol3 } from "./23_Num1toCol3";
import { BooltoNum1 } from "./24_BooltoNum1";
import { Num1toBool } from "./25_Num1toBool";
import { Num1toNum2 } from "./26_Num1toNum2";
import { Num2toNum1 } from "./27_Num2toNum1";
import { OutputNum1 } from "./28_OutputNum1";
import { OutputNum2 } from "./29_OutputNum2";
import { OutputCol1 } from "./30_OutputCol1";
import { OutputCol3 } from "./31_OutputCol3";
import { OutputBool } from "./32_OutputBool";
import { OutputLut1 } from "./33_OutputLut1";
import { OutputLut3 } from "./34_OutputLut3";
// import InputString from "../../../renderer/components/graph_property_inputs/InputString";
// import { Dropdown } from "./06_Dropdown";

const DATA_NODES = [
  Number1Input(),
  Number1InputAndSlider(),
  Number2InputAndSlider(),
  Button(),
  Slider1(),
  Slider2(),
  Lut1(),
  Lut3(),
  ColorPicker1(),
  ColorPicker3(),
  // Dropdown,
  AddNumber(),
  SubstractNumber(),
  MultiplyNumber(),
  DivideNumber(),
  PowerNumber(),
  SquarerootNumber(),

  Col1toNum1(),
  Num1toCol1(),
  Col3toNum1(),
  Num1toCol3(),
  BooltoNum1(),
  Num1toBool(),
  Num1toNum2(),
  Num2toNum1(),

  OutputNum1(),
  OutputNum2(),
  OutputCol1(),
  OutputCol3(),
  OutputBool(),
  OutputLut1(),
  OutputLut3(),
];

export default DATA_NODES;
