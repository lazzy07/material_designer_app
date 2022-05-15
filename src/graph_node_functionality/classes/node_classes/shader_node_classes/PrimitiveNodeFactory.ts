import { v4 } from "uuid";
import { Graphs } from "../../../../interfaces/Graphs";
import { NodePropertyData } from "../../../interfaces/NodePropertyData";
import { InputColor } from "./primitive_nodes/InputColor";
import { InputGrayscale } from "./primitive_nodes/InputGrayscale";
import { KernelInputColor } from "./primitive_nodes/KernelInputColor";
import { KernelInputGrayscale } from "./primitive_nodes/KernelInputGrayscale";
import { KernelOutputColor } from "./primitive_nodes/KernelOutputColor";
import { KernelOutputGrayscale } from "./primitive_nodes/KernelOutputGrayscale";
import { OutputColor } from "./primitive_nodes/OutputColor";
import { OutputGrayscale } from "./primitive_nodes/OutputGrayscale";
import { Viewer } from "./primitive_nodes/Viewer";
import ShaderNodeEditor from "./ShaderNodeEditor";

export const getNodeFromFactory = (
  nodeData: Graphs,
  editor: ShaderNodeEditor
) => {
  switch (nodeData.id) {
    case "1":
      return new InputColor(nodeData, "shaderGraph", editor);
    case "2":
      return new InputGrayscale(nodeData, "shaderGraph", editor);
    case "3":
      return new KernelInputColor(nodeData, "shaderGraph", editor);
    case "4":
      return new KernelInputGrayscale(nodeData, "shaderGraph", editor);
    case "5":
      return new KernelOutputColor(nodeData, "shaderGraph", editor);
    case "6":
      return new KernelOutputGrayscale(nodeData, "shaderGraph", editor);
    case "7":
      return new OutputColor(nodeData, "shaderGraph", editor);
    case "8":
      return new OutputGrayscale(nodeData, "shaderGraph", editor);
    case "9":
      return new Viewer(nodeData, "shaderGraph", editor);
    default:
      return new Viewer(nodeData, "shaderGraph", editor);
  }
};
