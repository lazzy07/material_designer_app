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
    case "number":
      return defaultColors.NUMBER_CONECTION_COLOR;
    case "number2":
      return defaultColors.NUMBER2_CONNECTION_COLOR;
    case "colorvec":
      return defaultColors.COLORVEC_CONNECTION_COLOR;
    case "colorvec3":
      return defaultColors.COLORVEC3_CONNECTION_COLOR;
    case "lut":
      return defaultColors.LUT_CONNECTION_COLOR;
    case "lut3":
      return defaultColors.LUT3_CONNECTION_COLOR;
    case "boolean":
      return defaultColors.BOOLEAN_CONNECTION_COLOR;
  }
};
