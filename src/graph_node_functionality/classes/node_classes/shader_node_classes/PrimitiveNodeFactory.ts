import { Graphs } from "../../../../interfaces/Graphs";
import { InputColor } from "./primitive_nodes/InputColor";
import { InputGrayscale } from "./primitive_nodes/InputGrayscale";
import { KernelInputColor } from "./primitive_nodes/KernelInputColor";
import { KernelInputGrayscale } from "./primitive_nodes/KernelInputGrayscale";
import { KernelOutputColor } from "./primitive_nodes/KernelOutputColor";
import { KernelOutputGrayscale } from "./primitive_nodes/KernelOutputGrayscale";
import { OutputColor } from "./primitive_nodes/OutputColor";
import { OutputGrayscale } from "./primitive_nodes/OutputGrayscale";
import { Viewer } from "./primitive_nodes/Viewer";

export const getNodeFromFactory = (nodeData: Graphs) => {
  switch (nodeData.id) {
    case "1":
      return new InputColor(nodeData, "shaderGraph");
    case "2":
      return new InputGrayscale(nodeData, "shaderGraph");
    case "3":
      return new KernelInputColor(nodeData, "shaderGraph");
    case "4":
      return new KernelInputGrayscale(nodeData, "shaderGraph");
    case "5":
      return new KernelOutputColor(nodeData, "shaderGraph");
    case "6":
      return new KernelOutputGrayscale(nodeData, "shaderGraph");
    case "7":
      return new OutputColor(nodeData, "shaderGraph");
    case "8":
      return new OutputGrayscale(nodeData, "shaderGraph");
    case "9":
      return new Viewer(nodeData, "shaderGraph");
    default:
      return new Viewer(nodeData, "shaderGraph");
  }
};
