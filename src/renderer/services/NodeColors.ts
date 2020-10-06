import { NODE_TYPES } from "../../nodes/NodeTypes";
import { defaultColors } from "../constants/Colors";

export const getNodeColor = (nodeType: NODE_TYPES) => {
  switch (nodeType) {
    case "generator.grayscale":
      return defaultColors.GENERATOR_GRAYSCALE;
    case "generator.color":
      return defaultColors.GENERATOR_COLOR;
    case "output.color":
      return defaultColors.OUTPUT_COLOR;
    case "output.grayscale":
      return defaultColors.OUTPUT_GRAYSCALE;
    case "process.color":
      return defaultColors.PROCESS_COLOR;
    case "process.grayscale":
      return defaultColors.PROCESS_GRAYSCALE;
  }
};
