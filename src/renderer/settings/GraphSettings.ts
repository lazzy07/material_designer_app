import { MOUSE_CONTROLLER_TYPE } from "../../interfaces/MouseControllerType";
import { Transform } from "../../packages/rete-1.4.4/view/area";

export default class GraphSettings {
  static graphConnectionCurvature = 0.4;
  static graphConnectionStrokeWidth = 2;
  static canvasSize = {x: 1000000, y: 1000000}
  static startTransformPos: Transform = {x: -GraphSettings.canvasSize.x/4, y: -GraphSettings.canvasSize.y/4, k: 0.5};
  static mouseControllerType: MOUSE_CONTROLLER_TYPE = "mousepad";
}
