import { Graphs } from "../../../../interfaces/Graphs";
import DataGraphReference from "./DataGraphReference";
import { Button } from "./primitive_nodes/Button";
import { Number1Input } from "./primitive_nodes/Number1Input";
import { Number1InputAndSlider } from "./primitive_nodes/Number1InputAndSlider";
import { Number2InputAndSlider } from "./primitive_nodes/Number2InputAndSlider";
import { Dropdown } from "./primitive_nodes/Dropdown";

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
    default:
      return new DataGraphReference(nodeData, "dataGraph");
  }
};
