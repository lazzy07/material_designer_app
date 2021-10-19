import { Graphs } from "../../../../interfaces/Graphs";
import DataGraphReference from "./DataGraphReference";
import { Number1Input } from "./primitive_nodes/Number1Input";

export const getNodeFromFactory = (nodeData: Graphs) => {
  switch (nodeData.id) {
    case "1":
      return new Number1Input(nodeData, "dataGraph");

    default:
      return new DataGraphReference(nodeData, "dataGraph");
  }
};
