import { CONNECTION_TYPES } from "../../nodes/ConnectionTypes";
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

export const getNodeConnectionColors = (connectionType: CONNECTION_TYPES) => {
  switch (connectionType) {
    case "color":
      return defaultColors.COLOR_CONNECTION_COLOR;
    case "grayscale":
      return defaultColors.GRAYSCALE_CONNETION_COLOR;
    case "float":
      return defaultColors.FLOAT_CONECTION_COLOR;
    case "int":
      return defaultColors.INT_CONNECTION_COLOR;
    case "float_vec2":
      return defaultColors.FLOATVEC2_CONNECTION_COLOR;
    case "int_vec2":
      return defaultColors.INTVEC2_CONNECTION_COLOR;
    case "colorpick":
      return defaultColors.COLORPICK_CONNECTION_COLOR;
  }
};
